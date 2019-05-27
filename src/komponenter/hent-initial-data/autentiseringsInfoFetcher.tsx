import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { fetchToJson } from '../../ducks/api-utils';
import { DataElement, requestConfig, STATUS } from '../../ducks/api';
import { contextpathDittNav, erMikrofrontend } from '../../utils/app-state-utils';

interface AutentiseringsInfoFetcher {
    children: React.ReactElement<any>;
}

export const AUTH_API = '/api/auth';

export enum InnloggingsNiva {
    LEVEL_1 = 'Level1',
    LEVEL_2 = 'Level2',
    LEVEL_3 = 'Level3',
    LEVEL_4 = 'Level4',
    UKJENT = 'Ukjent',
}

const initialState: InnloggingsInfo = {
    data: {
        isLoggedIn: false,
        securityLevel: InnloggingsNiva.UKJENT,
    },
    status: STATUS.NOT_STARTED,
};

export const InnloggingsInfoContext = React.createContext(initialState);

interface Data {
    isLoggedIn: boolean;
    securityLevel: string;
}

export interface InnloggingsInfo extends DataElement {
    data: Data;
}

const InnloggingsInfoFetcher = ({children}: AutentiseringsInfoFetcher) => {

    const [state, setState] = React.useState(initialState);

    const contextpath = erMikrofrontend() ? contextpathDittNav : '';

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data: Data = await fetchToJson(`${contextpath}${AUTH_API}`, requestConfig);
                setState({data, status: STATUS.OK});
            } catch (error) {
                if (error.response) {
                    error.response.text().then(() => {
                        setState({...state, status: STATUS.ERROR});
                    });
                } else {
                    setState({...state, status: STATUS.ERROR});
                }
            }
        };

        setState({...state, status: STATUS.PENDING});

        fetchData();
    }, []);


    return (
        <InnloggingsInfoContext.Provider value={state}>
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
                storrelse="XXL"
                avhengigheter={[state]}
            >
                {children}
            </Innholdslaster>
        </InnloggingsInfoContext.Provider>
    );
};

export default InnloggingsInfoFetcher;
