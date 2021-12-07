import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import sjekkOmBrukerErStandardInnsatsgruppe from './er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from './er-situasjonsbestemt-innsatsgruppe';
import { AmplitudeData } from '../metrics/amplitude-utils';
import { erPilotBruker } from './er-pilot-bruker';

export function kanViseOnboardingYtelser({
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
    const brukerErPilot = erPilotBruker({
        brukerInfoData,
        oppfolgingData,
        registreringData,
        amplitudeData,
    });
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const registrertFoerDato = brukerregistreringData
        ? new Date(brukerregistreringData.opprettetDato) < new Date('2021-12-07')
        : false;

    const skalViseForPilot = brukerErPilot && registrertFoerDato;

    const kanViseForSituasjonsbestemt = erSituasjonsbestemtInnsatsgruppe && brukerErPilot;

    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });

    const kanViseForStandard = erStandardInnsatsgruppe && !skalViseForPilot;

    return !erAAP && (kanViseForStandard || kanViseForSituasjonsbestemt) && !oppfolgingData.kanReaktiveres;
}
