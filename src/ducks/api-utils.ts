import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducer';
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

type RecoverWith = (status: number) => ({} | null);

export function sjekkStatuskode(recoverWith?: RecoverWith) {

    return (response: Response) => {
        if (response.status >= 200 && response.status < 300 && response.ok) {
            return Promise.resolve(response);
        }

        return (!!recoverWith && !!recoverWith(response.status)) ?
            Promise.resolve({json: () => recoverWith(response.status)}) :
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
    return <S>(data: S): S => { // tslint:disable-line no-any
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
    config?: RequestInit;
    recoverWith?: RecoverWith;
}

export function fetchToJson<DATA>(
    {
        url,
        config = {},
        recoverWith
    }: FetchToJson
): Promise<DATA> {
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
    {OK, FEILET, PENDING}: RestActions
): ThunkAction<Promise<DATA | void>, AppState, void> {
    return (dispatch: Dispatch<AppState>) => {
        if (PENDING) {
            dispatch({type: PENDING});
        }
        return fn()
            .then(sendResultatTilDispatch(dispatch, OK))
            .catch(handterFeil(dispatch, FEILET));
    };
}
