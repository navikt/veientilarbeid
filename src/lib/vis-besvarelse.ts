import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import * as FeatureToggles from '../contexts/feature-toggles';
import { BesvarelseResponse } from '../contexts/besvarelse';
import { BeregnedePerioder } from '../lib/beregn-arbeidssokerperioder';
import sjekkOmBrukerErStandardInnsatsgruppe from './er-standard-innsatsgruppe';

const DATO_FOR_LANSERING = new Date('2023-05-01');

// TODO: Ta hensyn til aktiv arbeidssøkerperiode

export function visBesvarelser({
    brukerInfoData,
    oppfolgingData,
    registreringData,
    featuretoggleData,
    besvarelseData,
    arbeidssokerPeriodeData,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    featuretoggleData: FeatureToggles.Data;
    besvarelseData: BesvarelseResponse | null;
    arbeidssokerPeriodeData: BeregnedePerioder;
}): boolean {
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;
    const datoForRegistrering = registreringData?.registrering.opprettetDato
        ? new Date(registreringData.registrering.opprettetDato)
        : new Date('2019-07-01');
    const toggleErAktiv = featuretoggleData[FeatureToggles.FeatureToggles.BRUK_ENDRING_AV_SITUASJON] || false;

    const aldersgruppeUtenForsterketInnsats = brukerInfoData.alder >= 30 && brukerInfoData.alder <= 59;

    const harEndretBesvarelse = besvarelseData && besvarelseData.endret !== null;

    const erRegistrertEtterLansering = datoForRegistrering > DATO_FOR_LANSERING;

    const harAktivArbeidssokerperiode = arbeidssokerPeriodeData.harAktivArbeidssokerperiode === 'Ja';

    return (
        (harEndretBesvarelse && toggleErAktiv && harAktivArbeidssokerperiode) ||
        (toggleErAktiv &&
            harAktivArbeidssokerperiode &&
            erRegistrertEtterLansering &&
            aldersgruppeUtenForsterketInnsats &&
            !erAAP &&
            sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) &&
            !oppfolgingData.kanReaktiveres)
    );
}
