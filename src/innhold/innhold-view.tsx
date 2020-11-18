import * as React from 'react';
import Rad from './rad';
import AapRad from '../komponenter/aap/aap';
import Dialog from '../komponenter/dialog/dialog';
import Banner from '../komponenter/banner/banner';
import Meldekort from '../komponenter/meldekort/meldekort';
import DittSykefravaer from '../komponenter/ditt-sykefravaer/ditt-sykefravaer';
import OkonomiRad from '../komponenter/okonomi/okonomi-rad';
import ReaktiveringMelding from '../komponenter/reaktivering-melding';
import Aktivitetsplan from '../komponenter/aktivitetsplan/aktivitetsplan';
import RessurslenkerJobbsok from '../komponenter/ressurslenker-jobbsok/ressurslenker-jobbsok';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';
import Motestotte from '../komponenter/motestotte/motestotte';
import './innhold.less';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import IARBSMelding from '../komponenter/iarbs-melding/iarbs-melding';
import Registrert from '../komponenter/registrert/registrert';
import { BrukerInfoContext } from '../ducks/bruker-info';

interface OwnProps {
    visRessurslenker: boolean;
    skalViseIARBSPlaster: boolean;
}

const AktivitetDialogMeldekort = () => {
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    return (
        <>
            <Aktivitetsplan />
            <div className="tokol">
                <Dialog />
                {erSykmeldtMedArbeidsgiver ? <DittSykefravaer /> : <Meldekort />}
            </div>
        </>
    );
};

const InnholdView = ({ visRessurslenker, skalViseIARBSPlaster }: OwnProps) => {
    return (
        <>
            <Banner />
            <Rad>
                <ReaktiveringMelding />
                <KrrMelding />
                <Registrert />
                <IARBSMelding visPlaster={skalViseIARBSPlaster} />
                <Egenvurdering />
                <Motestotte />
                <AktivitetDialogMeldekort />
            </Rad>

            <AapRad />
            <Rad>{visRessurslenker ? <RessurslenkerJobbsok /> : null}</Rad>
            <OkonomiRad />
        </>
    );
};

export default InnholdView;
