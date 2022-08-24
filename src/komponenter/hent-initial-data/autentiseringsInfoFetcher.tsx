import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { fetchData } from '../../ducks/api-utils';
import DataProvider from './data-provider';
import OppfolgingBrukerregistreringProvider from './oppfolging-brukerregistrering-provider';
import * as Autentisering from '../../contexts/autentisering';
import Innhold from '../../innhold/innhold';
import { AUTH_API } from '../../ducks/api';

const AutentiseringsInfoFetcher = () => {
    const [state, setState] = React.useState<Autentisering.State>(Autentisering.initialState);

    React.useEffect(() => {
        fetchData<Autentisering.State, Autentisering.Data>(state, setState, AUTH_API);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Innholdslaster feilmeldingKomponent={<Feilmelding />} storrelse="XXL" avhengigheter={[state]}>
            <Autentisering.AutentiseringContext.Provider value={state}>
                <OppfolgingBrukerregistreringProvider>
                    <DataProvider>
                        <Innhold />
                    </DataProvider>
                </OppfolgingBrukerregistreringProvider>
            </Autentisering.AutentiseringContext.Provider>
        </Innholdslaster>
    );
};

export default AutentiseringsInfoFetcher;
