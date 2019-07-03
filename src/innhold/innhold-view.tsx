import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import Rad from './rad';
import AapRad from '../komponenter/aap/aap';
import Dialog from '../komponenter/dialog/dialog';
import Banner from '../komponenter/banner/banner';
import Meldekort from '../komponenter/meldekort/meldekort';
import DittSykefravaer from '../komponenter/ditt-sykefravaer/ditt-sykefravaer';
import Dagpenger from '../komponenter/dagpenger/dagpenger';
import AlleSkjema from '../komponenter/alleskjema/alleskjema';
import Tiltakinfo from '../komponenter/tiltakinfo/tiltakinfo';
import OkonomiRad from '../komponenter/okonomi/okonomi-rad';
import ReaktiveringMelding from '../komponenter/reaktivering-melding';
import Aktivitetsplan from '../komponenter/aktivitetsplan/aktivitetsplan';
import RessurslenkerJobbsok from '../komponenter/ressurslenker-jobbsok/ressurslenker-jobbsok';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';
import Motestotte from '../komponenter/motestotte/motestotte';
import './innhold.less';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import { erMikrofrontend } from '../utils/app-state-utils';
import tekster from '../tekster/tekster';

interface OwnProps {
    erSykmeldtMedArbeidsgiver: boolean;
    skalViseKrrMelding: boolean;
    skalViseEgenvurderingLenke: boolean;
    skalViseMotestotteLenke: boolean;
    visRessurslenker: boolean;
    skalViseTiltaksinfoLenke: boolean;
}

export default ({erSykmeldtMedArbeidsgiver,
                    skalViseKrrMelding,
                    skalViseEgenvurderingLenke,
                    skalViseMotestotteLenke,
                    visRessurslenker,
                    skalViseTiltaksinfoLenke}: OwnProps) => {

    return (
        <>
            {erMikrofrontend() ? null : (erSykmeldtMedArbeidsgiver ? <Banner type="sykmeldt"/> :
                <Banner type="ordinaer"/>)}

            <Rad>
                <ReaktiveringMelding/>
                {skalViseKrrMelding ? <KrrMelding/> : null}
                {skalViseEgenvurderingLenke ? <Egenvurdering/> : null}
                {skalViseMotestotteLenke ? <Motestotte erSykmeldtMedArbeidsgiver={erSykmeldtMedArbeidsgiver}/> : null}
                <Aktivitetsplan/>
                <div className="tokol">
                    <Dialog/>
                    {erSykmeldtMedArbeidsgiver ? <DittSykefravaer/> : <Meldekort/>}
                </div>
            </Rad>

            {erSykmeldtMedArbeidsgiver && (
                <Rad><AapRad/></Rad>
            )}

            <Rad>
                {visRessurslenker ? <RessurslenkerJobbsok/> : null}
                {skalViseTiltaksinfoLenke ? <Tiltakinfo/> : null}
            </Rad>

            { erSykmeldtMedArbeidsgiver ? <Rad><OkonomiRad/></Rad> : <Rad><Systemtittel tag="h2" className="dagpenger__heading blokk-s">
                {tekster['dagpenger-heading-tekst']}
            </Systemtittel><div className="tokol"><Dagpenger/><AlleSkjema/></div></Rad>}
            
        </>
    );
};
