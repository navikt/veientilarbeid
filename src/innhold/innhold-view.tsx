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
import OkonomiRadDagpenger from '../komponenter/okonomi/okonomi-rad-dagpenger';
import './innhold.less';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import IARBSMelding from '../komponenter/iarbs-melding/iarbs-melding';
import { erMikrofrontend } from '../utils/app-state-utils';
import Registrert from '../komponenter/registrert/registrert';
import Situasjon from '../komponenter/din-situasjon/situasjon';
import { POAGruppe } from '../utils/get-poa-group';

interface OwnProps {
    erSykmeldtMedArbeidsgiver: boolean;
    skalViseKrrMelding: boolean;
    skalViseEgenvurderingLenke: boolean;
    skalViseMotestotteLenke: boolean;
    visRessurslenker: boolean;
    skalViseIARBSPlaster: boolean;
    skalViseRegistrert: boolean;
    erPermittert: boolean;
    erPermittertEllerEndret: boolean;
    poaGruppe: POAGruppe;
    geografiskTilknytning: string;
    isKSSX: string;
}

interface ErSykmeldtMedArbeidsgiverProps {
    erSykmeldtMedArbeidsgiver: boolean;
    poaGruppe: POAGruppe;
    geografiskTilknytning: string;
    isKSSX: string;
}

const AktivitetDialogMeldekort = ({erSykmeldtMedArbeidsgiver, poaGruppe, geografiskTilknytning, isKSSX}: ErSykmeldtMedArbeidsgiverProps) => {
    return (
        <>
            <Aktivitetsplan poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} />
                <div className="tokol">
                    <Dialog poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} />
                    {erSykmeldtMedArbeidsgiver ? <DittSykefravaer/> : <Meldekort poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} />}
                </div>
        </>
    )
}

export default ({erSykmeldtMedArbeidsgiver,
                    skalViseKrrMelding,
                    skalViseEgenvurderingLenke,
                    skalViseMotestotteLenke,
                    visRessurslenker,
                    skalViseIARBSPlaster,
                    skalViseRegistrert,
                    erPermittertEllerEndret,
                    poaGruppe,
                    isKSSX,
                    geografiskTilknytning,}: OwnProps) => {
    return (
        <>
            {erMikrofrontend() ? null : (erSykmeldtMedArbeidsgiver ? <Banner type="sykmeldt"/> :
                <Banner type="ordinaer"/>)}

            <Rad>
                <ReaktiveringMelding/>
                {skalViseKrrMelding ? <KrrMelding/> : null}
                {erPermittertEllerEndret && <Situasjon />}
                {skalViseRegistrert ? <Registrert poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} /> : null }
                {skalViseIARBSPlaster ? <IARBSMelding/> : null}
                {skalViseEgenvurderingLenke ? <Egenvurdering/> : null}
                {skalViseMotestotteLenke ? <Motestotte erSykmeldtMedArbeidsgiver={erSykmeldtMedArbeidsgiver}/> : null}
                <AktivitetDialogMeldekort erSykmeldtMedArbeidsgiver={erSykmeldtMedArbeidsgiver} poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} />
            </Rad>

            {erSykmeldtMedArbeidsgiver && (
                <Rad><AapRad/></Rad>
            )}

            <Rad>
                {visRessurslenker ? <RessurslenkerJobbsok poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} /> : null}
            </Rad>

            { erSykmeldtMedArbeidsgiver ? <Rad><OkonomiRad/></Rad> : <OkonomiRadDagpenger poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} />}
        </>
    );
};
