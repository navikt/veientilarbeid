import * as React from 'react';
import './innhold.less';
import Rad from './rad';
import AapRad from '../komponenter/aap/aap';
import Banner from '../komponenter/banner/banner';
import OkonomiRad from '../komponenter/okonomi/okonomi-rad';
import ReaktiveringMelding from '../komponenter/reaktivering-melding';
import RessurslenkerJobbsok from '../komponenter/ressurslenker-jobbsok/ressurslenker-jobbsok';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';
import Motestotte from '../komponenter/motestotte/motestotte';
import './innhold.less';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import IARBSMelding from '../komponenter/iarbs-melding/iarbs-melding';
import Registrert from '../komponenter/registrert/registrert';
import AktivitetDialogMeldekort from './aktivitet-dialog-meldekort';
import InnholdMetrics from './innhold-metrics';
import GenerelleFliser from '../komponenter/dittnav/generelle-fliser'

const InnholdView = () => {
    return (
        <>
            <InnholdMetrics />
            <Banner />
            <Rad>
                <ReaktiveringMelding />
                <KrrMelding />
                <Registrert />
                <IARBSMelding />
                <Egenvurdering />
                <Motestotte />
                <AktivitetDialogMeldekort />
            </Rad>

            <AapRad />
            <Rad>
                <RessurslenkerJobbsok />
            </Rad>
            <OkonomiRad />
            <GenerelleFliser />
        </>
    );
};

export default InnholdView;
