import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { fetchData } from '../../ducks/api-utils';
import { contextpathDittNav, erMikrofrontend } from '../../utils/app-state-utils';
import DataProvider from './data-provider';
import OppfolgingBrukerregistreringProvider from './oppfolging-brukerregistrering-provider';
import * as Autentisering from '../../ducks/autentisering';
import InnholdView from '../../innhold/innhold-view';
import SjekkInnlogging from './sjekk-innlogging';

export const AUTH_API = '/api/auth';

const AutentiseringsInfoFetcher = () => {
    const [state, setState] = React.useState<Autentisering.State>(Autentisering.initialState);

    const contextpath = erMikrofrontend() ? contextpathDittNav : '';

    React.useEffect(() => {
        fetchData<Autentisering.State, Autentisering.Data>(state, setState, `${contextpath}${AUTH_API}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse" />}
            storrelse="XXL"
            avhengigheter={[state]}
        >
            <Autentisering.AutentiseringContext.Provider value={state}>
                <SjekkInnlogging bypassComponent={<InnholdView />}>
                    <OppfolgingBrukerregistreringProvider>
                        <DataProvider>
                            <InnholdView />
                        </DataProvider>
                    </OppfolgingBrukerregistreringProvider>
                </SjekkInnlogging>
            </Autentisering.AutentiseringContext.Provider>
        </Innholdslaster>
    );
};

export default AutentiseringsInfoFetcher;
