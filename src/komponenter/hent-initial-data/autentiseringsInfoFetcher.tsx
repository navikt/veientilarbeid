import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { fetchToJson } from '../../ducks/api-utils';
import { DataElement, requestConfig, STATUS } from '../../ducks/api';

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

export const InnloggingsInfoContext = React.createContext({});

const InnloggingsInfoFetcher = ({children}: AutentiseringsInfoFetcher) => {

    interface Data {
        isLoggedIn: boolean;
        securityLevel: string;
    }

    interface InnloggingsInfo extends DataElement {
        data: Data;
    }

    const initialState: InnloggingsInfo = {
        data: {
            isLoggedIn: false,
            securityLevel: InnloggingsNiva.UKJENT,
        },
        status: STATUS.NOT_STARTED,
    };

    const [state, setState] = React.useState(initialState);

    React.useEffect(() => {
        const fetchData = async () => {
            const data: Data = await fetchToJson(AUTH_API, requestConfig);
            setState({data, status: STATUS.OK});
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
