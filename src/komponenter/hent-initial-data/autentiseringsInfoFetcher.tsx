import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { fetchData } from '../../ducks/api-utils';
import { contextpathDittNav, erMikrofrontend } from '../../utils/app-state-utils';
import DataProvider from './data-provider';
import InnholdLogikkNiva4 from '../../innhold/innhold-logikk-niva4';
import InnholdLogikkNiva3 from '../../innhold/innhold-logikk-niva3';
import OppfolgingBrukerregistreringProvider from './oppfolging-brukerregistrering-provider';

import {Data as AutentiseringData, State as AutentiseringState, initialState, InnloggingsNiva, AutentiseringContext} from '../../ducks/autentisering';

export const AUTH_API = '/api/auth';

const AutentiseringsInfoFetcher = () => {

    const [state, setState] = React.useState<AutentiseringState>(initialState);

    const contextpath = erMikrofrontend() ? contextpathDittNav : '';

    React.useEffect(() => {
        fetchData<AutentiseringState, AutentiseringData>(state, setState, `${contextpath}${AUTH_API}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
            storrelse="XXL"
            avhengigheter={[state]}
        >
            <AutentiseringContext.Provider value={state}>
                {state.data.securityLevel === InnloggingsNiva.LEVEL_3
                    ? <InnholdLogikkNiva3/>
                    : <OppfolgingBrukerregistreringProvider>
                        <DataProvider>
                            <InnholdLogikkNiva4/>
                        </DataProvider>
                    </OppfolgingBrukerregistreringProvider>
                }
            </AutentiseringContext.Provider>
        </Innholdslaster>
    );
};

export default AutentiseringsInfoFetcher;
