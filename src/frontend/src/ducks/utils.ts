import { Dispatch } from 'react-redux';
import { AppState } from '../reducer';
import { ThunkAction } from 'redux-thunk';
import ActionType from './actions';

export const STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    PENDING: 'PENDING',
    OK: 'OK',
    RELOADING: 'RELOADING',
    ERROR: 'ERROR'
};

class FetchError extends Error {
    public response: Response;

    constructor(message: string, response: Response) {
        super(message);
        this.response = response;
    }
}

type RecoverWith = (status: number) => ({} | null) | {};

function getRecoverWithFunction(recoverWith?: RecoverWith): (status?: number) => {} | null {
    switch (typeof recoverWith) {
        case 'object': {
            return () => (recoverWith as {});
        }
        case 'function': {
            return (recoverWith as RecoverWith);
        }
        default: {
            return () => null;
        }
    }
}

export function sjekkStatuskode(recoverWith?: RecoverWith) {

    return (response: Response) => {
        if (response.status >= 200 && response.status < 300 && response.ok) {
            return Promise.resolve(response);
        }
        const recoverWithFunction = getRecoverWithFunction(recoverWith);

        return !!recoverWithFunction(response.status) ?
            Promise.resolve({json: () => recoverWithFunction(response.status)}) :
            Promise.reject(new FetchError(response.statusText, response));
    };
}

export function toJson(response: Response) {
    if (response.status !== 204) { // No content
        return response.json();
    }
    return response;
}

export function sendResultatTilDispatch(dispatch: Dispatch<AppState>, action: ActionType) {
    return <S>(data: S): S => {
        dispatch({type: action, data});
        return data;
    };
}

export function handterFeil(dispatch: Dispatch<AppState>, action: ActionType) {
    return (error: FetchError): void => {
        if (error.response) {
            error.response.text().then((data: string) => {
                console.error(error, error.stack, data); // tslint:disable-line no-console
                dispatch({type: action, data: {response: error.response, data}});
            });
        } else {
            console.error(error, error.stack); // tslint:disable-line no-console
            dispatch({type: action, data: error.toString()});
        }
    };
}

interface FetchToJson {
    url: string;
    config?: { credentials: RequestCredentials};
    recoverWith?: RecoverWith;
}

export function fetchToJson<DATA>({
                                      url,
                                      config = {credentials: 'include'},
                                      recoverWith}: FetchToJson): Promise<DATA> {

    return fetch(url, config)
        .then(sjekkStatuskode(recoverWith))
        .then(toJson);
}

interface RestActions {
    OK: ActionType;
    PENDING: ActionType;
    FEILET: ActionType;
}

export function doThenDispatch<DATA>(
    fn: () => Promise<DATA>,
    {OK, FEILET, PENDING}: RestActions): ThunkAction<Promise<DATA | void>, AppState, void> {
    return (dispatch: Dispatch<AppState>) => {
        if (PENDING) {
            dispatch({type: PENDING});
        }
        return fn()
            .then(sendResultatTilDispatch(dispatch, OK))
            .catch(handterFeil(dispatch, FEILET));
    };
}
