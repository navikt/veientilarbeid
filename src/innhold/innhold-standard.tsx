import './innhold.css';
import Rad from './rad';
import ReaktiveringKort from '../komponenter/reaktivering/reaktivering-kort';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import Registrert from '../komponenter/registrert/registrert';
import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import StatusTittel from '../komponenter/registrert/status-tittel';
import EkspanderbartInnsyn from '../komponenter/innsyn/ekspanderbart-innsyn';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import OnboardingStandard from '../komponenter/onboarding-standard/onboarding-standard';
import GjelderFraDato from '../komponenter/gjelder-fra-dato/GjelderFraDato';

const InnholdStandard = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport" />
            <Rad>
                <ReaktiveringKort />
                <KrrMelding />
                <StatusTittel />
                <GjelderFraDato />
                <OnboardingStandard />
                <ReaktiveringKvittering />
                <Registrert />
                <EkspanderbartInnsyn />
            </Rad>
            <InViewport loggTekst="Bunnen av veien til arbeid - standard i viewport" />
        </>
    );
};

export default InnholdStandard;
