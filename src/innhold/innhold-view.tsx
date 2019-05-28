import * as React from 'react';
import Rad from './rad';
import AapRad from '../komponenter/aap/aap';
import Dialog from '../komponenter/dialog/dialog';
import Banner from '../komponenter/banner/banner';
import Meldekort from '../komponenter/meldekort/meldekort';
import DittSykefravaer from '../komponenter/ditt-sykefravaer/ditt-sykefravaer';
import Dagpenger from '../komponenter/dagpenger/dagpenger';
import Tiltakinfo from '../komponenter/tiltakinfo/tiltakinfo';
import OkonomiRad from '../komponenter/okonomi/okonomi-rad';
import ReaktiveringMelding from '../komponenter/reaktivering-melding';
import Aktivitetsplan from '../komponenter/aktivitetsplan/aktivitetsplan';
import RessurslenkerJobbsok from '../komponenter/ressurslenker-jobbsok/ressurslenker-jobbsok';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';
import Motestotte from '../komponenter/motestotte/motestotte';
import './innhold.less';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import {erMikrofrontend} from '../utils/app-state-utils';
import {InnloggingsInfoContext} from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';

interface OwnProps {
    erSykmeldtMedArbeidsgiver: boolean;
    skalViseKrrMelding: boolean;
    skalViseEgenvurderingLenke: boolean;
    skalViseMoteStotteLenke: boolean;
    visRessurslenker: boolean;
    skalViseTiltaksinfoLenke: boolean;
}

export default ({erSykmeldtMedArbeidsgiver,
                    skalViseKrrMelding,
                    skalViseEgenvurderingLenke,
                    skalViseMoteStotteLenke,
                    visRessurslenker,
                    skalViseTiltaksinfoLenke}: OwnProps) => {
    // TODO Fjerne banner (inkl. brødsmuler)

    const value = React.useContext(InnloggingsInfoContext);
    console.log(value);

    return (
        <>
            {erMikrofrontend() ? null : (erSykmeldtMedArbeidsgiver ? <Banner type="sykmeldt"/> :
                <Banner type="ordinaer"/>)}

            <Rad>
                <ReaktiveringMelding/>
                {skalViseKrrMelding ? <KrrMelding/> : null}
                {skalViseEgenvurderingLenke ? <Egenvurdering/> : null}
                {skalViseMoteStotteLenke ? <Motestotte erSykmeldtMedArbeidsgiver={erSykmeldtMedArbeidsgiver}/> : null}
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

            <Rad>
                {erSykmeldtMedArbeidsgiver ? <OkonomiRad/> : <Dagpenger/>}
            </Rad>
        </>
    );
};
