import React from 'react';

import Innholdslaster from './komponenter/innholdslaster/innholdslaster';
import * as Autentisering from './contexts/autentisering';
import Feilmelding from './komponenter/feilmeldinger/feilmelding';
import { fetchData } from './ducks/api-utils';
import { ARBEIDSSOKER_NIVA3_URL, AUTH_API } from './ducks/api';
import Innhold from './innhold/innhold';

import './index.css';
import * as Arbeidssoker from './contexts/arbeidssoker';

const Mikrofrontend = () => {
    const [state, setState] = React.useState<Autentisering.State>(Autentisering.initialState);
    const [arbeidssokerState, setArbeidssokerState] = React.useState<Arbeidssoker.State>(Arbeidssoker.initialState);

    React.useEffect(() => {
        fetchData<Autentisering.State, Autentisering.Data>(state, setState, AUTH_API);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        fetchData<Arbeidssoker.State, Arbeidssoker.Data>(
            arbeidssokerState,
            setArbeidssokerState,
            ARBEIDSSOKER_NIVA3_URL
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Innholdslaster feilmeldingKomponent={<Feilmelding />} storrelse="XXL" avhengigheter={[state]}>
            <Autentisering.AutentiseringContext.Provider value={state}>
                <Arbeidssoker.ArbeidssokerContext.Provider value={arbeidssokerState}>
                    <Innhold />
                </Arbeidssoker.ArbeidssokerContext.Provider>
            </Autentisering.AutentiseringContext.Provider>
        </Innholdslaster>
    );
};

export default Mikrofrontend;
