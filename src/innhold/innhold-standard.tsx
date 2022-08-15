import './innhold.css';
import Rad from './rad';
import ReaktiveringKort from '../komponenter/reaktivering/reaktivering-kort';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import Registrert from '../komponenter/registrert/registrert';
import AktivitetDialogMeldekort from './aktivitet-dialog-meldekort';
import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import StatusTittel from '../komponenter/registrert/status-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import OnboardingStandard from '../komponenter/onboarding-standard/onboarding-standard';
import GjelderFraDato from '../komponenter/gjelder-fra-dato/GjelderFraDato';
import DagpengerOgYtelser from '../komponenter/dagpenger/dagpenger-og-ytelser';
import Meldekort from '../komponenter/meldekort/meldekort';
import HjelpOgStotte from '../komponenter/hjelp-og-stotte/hjelp-og-stotte';
import Aktivitetsplan from '../komponenter/aktivitetsplan/aktivitetsplan-ny';

const InnholdStandard = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport" />
            <Rad>
                <ReaktiveringKort />
                <KrrMelding />
                <StatusTittel />
                <ReaktiveringKvittering />
                <DagpengerOgYtelser />
                <Meldekort />
                <HjelpOgStotte />
                <Aktivitetsplan />
                <GjelderFraDato />
                <OnboardingStandard />
                <Registrert />
                <Egenvurdering />
                <AktivitetDialogMeldekort />
            </Rad>
            <InViewport loggTekst="Bunnen av veien til arbeid i viewport" />
        </>
    );
};

export default InnholdStandard;
