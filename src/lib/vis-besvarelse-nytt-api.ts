import {
    hentSisteArbeidssokerPeriode,
    hentSisteOpplysningerOmArbeidssoker,
    ArbeidssokerperioderResponse,
    OpplysningerOmArbeidssokerResponse,
} from '@navikt/arbeidssokerregisteret-utils';

import * as Brukerregistrering from '../hooks/use-brukerregistrering-data';
import * as Oppfolging from '../hooks/use-oppfolging-data';
import * as BrukerInfo from '../hooks/use-brukerinfo-data';
import * as FeatureToggles from '../contexts/feature-toggles';
import { BesvarelseResponse } from '../contexts/besvarelse';

const DATO_FOR_LANSERING = new Date('2023-02-01');

export function visBesvarelserNyttApi({
    brukerInfoData,
    oppfolgingData,
    featuretoggleData,
    besvarelseData,
    arbeidssoekerPerioder,
    opplysningerOmArbeidssoeker,
    erStandardInnsats,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    featuretoggleData: FeatureToggles.FeatureToggleData;
    besvarelseData: BesvarelseResponse | null;
    arbeidssoekerPerioder: ArbeidssokerperioderResponse;
    opplysningerOmArbeidssoeker: OpplysningerOmArbeidssokerResponse;
    erStandardInnsats: boolean | undefined;
}): boolean {
    const brukEndringAvSituasjon = featuretoggleData[FeatureToggles.FeatureToggles.BRUK_ENDRING_AV_SITUASJON] || false;
    const brukOpplysningerApi = featuretoggleData[FeatureToggles.FeatureToggles.BRUK_OPPLYSNINGER_API] || false;
    const toggleErAktiv = brukEndringAvSituasjon && brukOpplysningerApi;
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const sisteArbeidssoekerPeriode = hentSisteArbeidssokerPeriode(arbeidssoekerPerioder);
    const datoForRegistrering = sisteArbeidssoekerPeriode?.periodeId
        ? new Date(sisteArbeidssoekerPeriode.startet.tidspunkt)
        : new Date('2019-07-01');
    const sisteOpplysninger = hentSisteOpplysningerOmArbeidssoker(opplysningerOmArbeidssoeker);

    const erPermittert =
        (sisteOpplysninger &&
            sisteOpplysninger.jobbsituasjon &&
            sisteOpplysninger.jobbsituasjon[0].beskrivelse === Brukerregistrering.DinSituasjonSvar.ER_PERMITTERT) ||
        false;

    const aldersgruppeUtenForsterketInnsats = brukerInfoData.alder >= 30 && brukerInfoData.alder <= 59;

    const harEndretBesvarelse = besvarelseData && besvarelseData.erBesvarelsenEndret;

    const erRegistrertEtterLansering = datoForRegistrering > DATO_FOR_LANSERING;

    const harAktivArbeidssokerperiode = sisteArbeidssoekerPeriode
        ? sisteArbeidssoekerPeriode.avsluttet === null
        : false;

    return (
        (harEndretBesvarelse && toggleErAktiv && harAktivArbeidssokerperiode) ||
        (toggleErAktiv &&
            harAktivArbeidssokerperiode &&
            erRegistrertEtterLansering &&
            erPermittert &&
            aldersgruppeUtenForsterketInnsats &&
            !erAAP &&
            Boolean(erStandardInnsats) &&
            !oppfolgingData.kanReaktiveres)
    );
}
