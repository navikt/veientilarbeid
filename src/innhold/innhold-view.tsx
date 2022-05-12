import './innhold.css';
import Rad from './rad';
import AapRad from '../komponenter/aap/aap';
import ReaktiveringKort from '../komponenter/reaktivering/reaktivering-kort';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';
import Motestotte from '../komponenter/motestotte/motestotte';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import Registrert from '../komponenter/registrert/registrert';
import AktivitetDialogMeldekort from './aktivitet-dialog-meldekort';
import InnholdMetrics from './innhold-metrics';
import GenerelleFliser from '../komponenter/dittnav/generelle-fliser';
import InViewport from '../komponenter/in-viewport/in-viewport';
import StatusTittel from '../komponenter/registrert/status-tittel';
import EkspanderbartInnsyn from '../komponenter/innsyn/ekspanderbart-innsyn';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import OnboardingStandard from '../komponenter/onboarding-standard/onboarding-standard';

const InnholdView = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport" />
            <Rad>
                <ReaktiveringKort />
                <KrrMelding />
                <StatusTittel />
                <OnboardingStandard />
                <ReaktiveringKvittering />
                <Registrert />
                <EkspanderbartInnsyn />
                <Egenvurdering />
                <Motestotte />
                <AktivitetDialogMeldekort />
                <GenerelleFliser />
            </Rad>

            <AapRad />
            <InViewport loggTekst="Bunnen av veien til arbeid i viewport" />
        </>
    );
};

export default InnholdView;
