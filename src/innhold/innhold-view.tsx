import './innhold.less';
import Rad from './rad';
import AapRad from '../komponenter/aap/aap';
import Banner from '../komponenter/banner/banner';
import ReaktiveringKort from '../komponenter/reaktivering/reaktivering-kort';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';
import Motestotte from '../komponenter/motestotte/motestotte';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import Registrert from '../komponenter/registrert/registrert';
import Brukerundersokelse from '../komponenter/brukerundersokelse/brukerundersokelse';
import AktivitetDialogMeldekort from './aktivitet-dialog-meldekort';
import InnholdMetrics from './innhold-metrics';
import GenerelleFliser from '../komponenter/dittnav/generelle-fliser';
import InViewport from '../komponenter/in-viewport/in-viewport';

const InnholdView = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport" />
            <Banner />
            <Rad>
                <ReaktiveringKort />
                <KrrMelding />
                <Brukerundersokelse />
                <Registrert />
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
