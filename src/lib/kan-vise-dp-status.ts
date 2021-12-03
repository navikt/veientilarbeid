import { Data as FeauturetoggleData } from '../contexts/feature-toggles';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import { AmplitudeData } from '../metrics/amplitude-utils';
import { erKSSBruker } from './er-kss-bruker';

function kanViseDpStatusStandard({
    brukerInfoData,
    oppfolgingData,
    registreringData,
    amplitudeData,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    amplitudeData: AmplitudeData;
}): boolean {
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;
    const harRettMeldeGruppe = ['ARBS', 'DAGP'].includes(amplitudeData.meldegruppe);
    const erARBS = oppfolgingData.formidlingsgruppe === 'ARBS';
    const registrertEtterDato = brukerregistreringData
        ? new Date(brukerregistreringData.opprettetDato) > new Date('2021-05-22')
        : false;

    const registrertFoerDato = brukerregistreringData
        ? new Date(brukerregistreringData.opprettetDato) < new Date('2021-06-26')
        : false;

    return (
        !erAAP &&
        erARBS &&
        harRettMeldeGruppe &&
        registrertEtterDato &&
        registrertFoerDato &&
        !oppfolgingData.kanReaktiveres
    );
}

function kanViseDpStatusKSS({
    amplitudeData,
    featuretoggleData,
    oppfolgingData,
    brukerInfoData,
    registreringData,
}: {
    amplitudeData: AmplitudeData;
    featuretoggleData: FeauturetoggleData;
    oppfolgingData: Oppfolging.Data;
    brukerInfoData: BrukerInfo.Data;
    registreringData: Brukerregistrering.Data | null;
}): boolean {
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;
    const harRettMeldeGruppe = ['ARBS', 'DAGP'].includes(amplitudeData.meldegruppe);
    const registrertEtterDato = brukerregistreringData
        ? new Date(brukerregistreringData.opprettetDato) > new Date('2021-05-22')
        : false;

    const registrertFoerDato = brukerregistreringData
        ? new Date(brukerregistreringData.opprettetDato) < new Date('2021-12-06')
        : false;
    const erKSS = erKSSBruker({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });
    return (
        !erAAP &&
        erKSS &&
        harRettMeldeGruppe &&
        registrertEtterDato &&
        registrertFoerDato &&
        !oppfolgingData.kanReaktiveres
    );
}

function kanViseDpStatus({
    amplitudeData,
    featuretoggleData,
    oppfolgingData,
    brukerInfoData,
    registreringData,
}: {
    amplitudeData: AmplitudeData;
    featuretoggleData: FeauturetoggleData;
    oppfolgingData: Oppfolging.Data;
    brukerInfoData: BrukerInfo.Data;
    registreringData: Brukerregistrering.Data | null;
}): boolean {
    const featuretoggleDagpengerStatusAktivert = featuretoggleData['veientilarbeid.dagpenger-status'];
    const featuretoggleDPStatusForAlleAktivert = featuretoggleData['veientilarbeid.dpstatus-for-alle'];

    const kanViseKomponent =
        (featuretoggleDagpengerStatusAktivert &&
            kanViseDpStatusKSS({
                amplitudeData,
                featuretoggleData,
                oppfolgingData,
                brukerInfoData,
                registreringData,
            })) ||
        (featuretoggleDPStatusForAlleAktivert &&
            kanViseDpStatusStandard({ amplitudeData, oppfolgingData, brukerInfoData, registreringData }));

    return kanViseKomponent;
}

export default kanViseDpStatus;
