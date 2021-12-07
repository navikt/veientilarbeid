import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useMeldekortData } from '../../contexts/meldekort';
import { useOppfolgingData } from '../../contexts/oppfolging';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import { kanViseMeldekortStatus } from '../../lib/kan-vise-meldekort-status';
import { fjernFraBrowserStorage } from '../../utils/browserStorage-utils';
import Tema from '../tema/tema';
import { SituasjonsbestemtKortliste, SituasjonsbestemtStartkort } from './situasjonsbestemt';
import Sluttkort from './Sluttkort';
import { StandardKortliste, StandardStartkort } from './standard';

const MeldekortOnboarding = () => {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const amplitudeData = useAmplitudeData();
    const meldekortData = useMeldekortData();
    const brukerInfoData = useBrukerinfoData();

    const MELDEKORT_ONBOARDING_KEY = 'meldekortintro';

    const brukerregistreringData = registreringData?.registrering ?? null;

    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    if (
        !kanViseMeldekortStatus({
            meldekortData,
            oppfolgingData,
            brukerInfoData,
            registreringData,
        })
    ) {
        fjernFraBrowserStorage(MELDEKORT_ONBOARDING_KEY);
        return null;
    }

    const introKort = erSituasjonsbestemtInnsatsgruppe
        ? [<SituasjonsbestemtStartkort />, ...SituasjonsbestemtKortliste, <Sluttkort />]
        : [<StandardStartkort />, ...StandardKortliste, <Sluttkort />];

    const erNyregistrert = amplitudeData.ukerRegistrert === 0;
    const hoppOverPreState = false;

    return (
        <Tema
            header="Meldekort"
            id={MELDEKORT_ONBOARDING_KEY}
            amplitudeTemaTag="meldekort"
            hoppOverPreState={hoppOverPreState}
            hoppRettTilSluttkort={!erNyregistrert}
            innhold={introKort}
        />
    );
};

export default MeldekortOnboarding;
