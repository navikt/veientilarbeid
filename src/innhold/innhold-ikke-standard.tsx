import './innhold.css';
import ReaktiveringKort from '../komponenter/reaktivering/reaktivering-kort';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import StatusTittel from '../komponenter/registrert/status-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import IkkeStandard from '../komponenter/ikke-standard/ikke-standard';
import Motestotte from '../komponenter/motestotte/motestotte';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';

const InnholdView = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport - ikke-standard" />
            <div className="limit">
                <ReaktiveringKort />
                <KrrMelding />
                <ReaktiveringKvittering />
                <StatusTittel />
                <IkkeStandard />
                <Motestotte />
                <Egenvurdering />
            </div>
            <InViewport loggTekst="Bunnen av veien til arbeid i viewport - ikke-standard" />
        </>
    );
};

export default InnholdView;
