import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {
    State as OppfolgingState,
    Data as OppfolgingData,
    initialState as oppfolgingInitialState,
    OppfolgingContext
} from '../../ducks/oppfolging';
import Feilmelding from '../feilmeldinger/feilmelding';
import {
    State as BrukerregistreringState,
    Data as BrukerregistreringData,
    initialState as brukerregistreringInitialState,
    BrukerregistreringContext
} from '../../ducks/brukerregistrering';
import { fetchData } from '../../ducks/api-utils';
import { BRUKERREGISTRERING_URL, VEILARBOPPFOLGING_URL } from '../../ducks/api';
import SjekkOppfolging from './sjekk-oppfolging';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

type OppfolgingProviderProps = OwnProps;

const OppfolgingBrukerregistreringProvider = ({children}: OppfolgingProviderProps) => {

    const [brukerregistreringState, setBrukerregistreringState] = React.useState<BrukerregistreringState>(brukerregistreringInitialState);
    const [oppfolgingState, setOppfolgingState] = React.useState<OppfolgingState>(oppfolgingInitialState);

    React.useEffect(() => {
        fetchData<OppfolgingState, OppfolgingData>(oppfolgingState, setOppfolgingState, VEILARBOPPFOLGING_URL);
        fetchData<BrukerregistreringState, BrukerregistreringData>(brukerregistreringState, setBrukerregistreringState, BRUKERREGISTRERING_URL);

    }, []);

    return (
        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
            storrelse="XXL"
            avhengigheter={[oppfolgingState, brukerregistreringState]}
        >
            <OppfolgingContext.Provider value={oppfolgingState}>
                <SjekkOppfolging underOppfolging={oppfolgingState.data.underOppfolging}>
                    <BrukerregistreringContext.Provider value={brukerregistreringState}>
                        {children}
                    </BrukerregistreringContext.Provider>
                </SjekkOppfolging>
            </OppfolgingContext.Provider>
        </Innholdslaster>
    );
};

export default OppfolgingBrukerregistreringProvider;
