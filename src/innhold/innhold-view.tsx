import * as React from 'react';
import './innhold.less';
import Rad from './rad';
import AapRad from '../komponenter/aap/aap';
import Banner from '../komponenter/banner/banner';
import OkonomiRad from '../komponenter/okonomi/okonomi-rad';
import ReaktiveringKort from '../komponenter/reaktivering/reaktivering-kort';
import RessurslenkerJobbsok from '../komponenter/ressurslenker-jobbsok/ressurslenker-jobbsok';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';
import Motestotte from '../komponenter/motestotte/motestotte';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import Registrert from '../komponenter/registrert/registrert';
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
                <Registrert />
                <Egenvurdering />
                <Motestotte />
                <AktivitetDialogMeldekort />
                <GenerelleFliser />
            </Rad>

            <AapRad />
            <Rad>
                <RessurslenkerJobbsok />
            </Rad>
            <OkonomiRad />
        </>
    );
};

export default InnholdView;
