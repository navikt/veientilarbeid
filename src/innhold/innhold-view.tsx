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
import { erMikrofrontend } from '../utils/app-state-utils';
import Registrert from '../komponenter/registrert/registrert';
import Situasjon from '../komponenter/din-situasjon/situasjon';
import { BrukerInfoContext } from '../ducks/bruker-info';

interface OwnProps {
    erSykmeldtMedArbeidsgiver: boolean;
    skalViseEgenvurderingLenke: boolean;
    visRessurslenker: boolean;
    skalViseIARBSPlaster: boolean;
    erPermittert: boolean;
    erPermittertEllerEndret: boolean;
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

const InnholdView = ({
    erSykmeldtMedArbeidsgiver,
    skalViseEgenvurderingLenke,
    visRessurslenker,
    skalViseIARBSPlaster,
    erPermittertEllerEndret,
}: OwnProps) => {
    return (
        <>
            {erMikrofrontend() ? null : erSykmeldtMedArbeidsgiver ? (
                <Banner type="sykmeldt" />
            ) : (
                <Banner type="ordinaer" />
            )}
            <Rad>
                <ReaktiveringMelding />
                <KrrMelding />
                {erPermittertEllerEndret && <Situasjon />}
                <Registrert />
                <IARBSMelding visPlaster={skalViseIARBSPlaster} />
                {skalViseEgenvurderingLenke ? <Egenvurdering /> : null}
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
