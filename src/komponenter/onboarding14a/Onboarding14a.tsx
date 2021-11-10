import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import Kortbunke from './Kortbunke';
import Enkeltkort from './Enkeltkort';
import { kanViseOnboarding14A } from '../../lib/kan-vise-onboarding14a';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { erPilotBruker } from '../../lib/er-pilot-bruker';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { kanViseEgenvurdering } from '../../lib/kan-vise-egenvurdering';
import { useUnderOppfolgingData } from '../../contexts/under-oppfolging';
import { useAutentiseringData } from '../../contexts/autentisering';
import { useEgenvurderingData } from '../../contexts/egenvurdering';
import EgenvurederingKort from './EgenvurederingKort';

function Onboarding14a(): JSX.Element | null {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const brukerInfoData = useBrukerinfoData();
    const amplitudeData = useAmplitudeData();

    const underOppfolgingData = useUnderOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const egenvurderingData = useEgenvurderingData();

    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });
    // const visOnboardingForSituasjonsbestemtToggle = featuretoggleData['veientilarbeid.onboarding14a.situasjonsbestemt'];

    const brukerErPilot = erPilotBruker({
        brukerInfoData,
        oppfolgingData,
        registreringData,
        amplitudeData,
    });
    const kanViseSituasjonsbestemt = erSituasjonsbestemtInnsatsgruppe && brukerErPilot; // visOnboardingForSituasjonsbestemtToggle;

    const skalViseEgenvurdering = kanViseEgenvurdering({
        underOppfolgingData,
        registreringData,
        autentiseringData,
        egenvurderingData,
        oppfolgingData,
    });

    const kanViseKomponent = kanViseOnboarding14A({
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
        amplitudeData,
    });
    const featuretoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.vis-egenvurdering-med-14a'];

    if (!kanViseKomponent) return null;

    if (skalViseEgenvurdering && featuretoggleAktivert && !erSituasjonsbestemtInnsatsgruppe)
        return <EgenvurederingKort />;
    if (kanViseSituasjonsbestemt) return <Enkeltkort />;
    if (erStandardInnsatsgruppe) return <Kortbunke />;

    return null;
}

export default Onboarding14a;
