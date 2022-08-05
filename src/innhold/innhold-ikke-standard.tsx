import './innhold.css';
import Rad from './rad';
import ReaktiveringKort from '../komponenter/reaktivering/reaktivering-kort';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import InnholdMetrics from './innhold-metrics';
import GenerelleFliser from '../komponenter/dittnav/generelle-fliser';
import InViewport from '../komponenter/in-viewport/in-viewport';
import StatusTittel from '../komponenter/registrert/status-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import IkkeStandard from '../komponenter/ikke-standard/ikke-standard';

const InnholdView = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport - ikke-standard" />
            <Rad>
                <ReaktiveringKort />
                <KrrMelding />
                <StatusTittel />
                <ReaktiveringKvittering />
                <IkkeStandard />
                <GenerelleFliser />
            </Rad>
            <InViewport loggTekst="Bunnen av veien til arbeid i viewport - ikke-standard" />
        </>
    );
};

export default InnholdView;