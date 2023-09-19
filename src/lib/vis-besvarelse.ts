import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import * as FeatureToggles from '../contexts/feature-toggles';
import { BesvarelseResponse } from '../contexts/besvarelse';
import { BeregnedePerioder } from './beregn-arbeidssokerperioder';

const DATO_FOR_LANSERING = new Date('2023-02-01');

// TODO: gå over til å bruke besvarelse i steder for registreringData
export function visBesvarelser({
    brukerInfoData,
    oppfolgingData,
    registreringData,
    featuretoggleData,
    besvarelseData,
    arbeidssokerPeriodeData,
    erStandardInnsats,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    featuretoggleData: FeatureToggles.FeatureToggleData;
    besvarelseData: BesvarelseResponse | null;
    arbeidssokerPeriodeData: BeregnedePerioder;
    erStandardInnsats: boolean;
}): boolean {
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;
    const datoForRegistrering = registreringData?.registrering?.opprettetDato
        ? new Date(registreringData.registrering.opprettetDato)
        : new Date('2019-07-01');
    const toggleErAktiv = featuretoggleData[FeatureToggles.FeatureToggles.BRUK_ENDRING_AV_SITUASJON] || false;

    const erPermittert =
        (brukerregistreringData &&
            brukerregistreringData.besvarelse.dinSituasjon === Brukerregistrering.DinSituasjonSvar.ER_PERMITTERT) ||
        false;

    const aldersgruppeUtenForsterketInnsats = brukerInfoData.alder >= 30 && brukerInfoData.alder <= 59;

    const harEndretBesvarelse = besvarelseData && besvarelseData.erBesvarelsenEndret;

    const erRegistrertEtterLansering = datoForRegistrering > DATO_FOR_LANSERING;

    const harAktivArbeidssokerperiode = arbeidssokerPeriodeData.harAktivArbeidssokerperiode === 'Ja';

    return (
        (harEndretBesvarelse && toggleErAktiv && harAktivArbeidssokerperiode) ||
        (toggleErAktiv &&
            harAktivArbeidssokerperiode &&
            erRegistrertEtterLansering &&
            erPermittert &&
            aldersgruppeUtenForsterketInnsats &&
            !erAAP &&
            erStandardInnsats &&
            !oppfolgingData.kanReaktiveres)
    );
}
