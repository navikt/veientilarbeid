import { Handling } from './actions';
import { Dispatch as ReduxDispatch } from '../dispatch-type';
import { requestConfig, STATUS } from './api';
import { Dispatch, SetStateAction } from 'react';

interface StatusActions<T> {
    ok: (data: T) => Handling;
    feilet: () => Handling;
    pending: () => Handling;
}

export function doThenDispatch<T>(
    fetchFunction: () => Promise<T>,
    { ok, feilet, pending }: StatusActions<T>
): (dispatch: ReduxDispatch) => Promise<void> {
    return async (dispatch: ReduxDispatch): Promise<void> => {
        dispatch(pending());
        try {
            const data = await fetchFunction();
            sendResultatTilDispatch<T>(dispatch, ok)(data);
        } catch (e) {
            handterFeil(dispatch, feilet)(e);
        }
    };
}

function sendResultatTilDispatch<T>(dispatch: ReduxDispatch, okAction: (temaer: T) => Handling): (jsonData: T) => void {
    return (jsonData: T) => {
        dispatch(okAction(jsonData));
    };
}

function handterFeil(dispatch: ReduxDispatch, feiletAction: () => Handling): (error: FetchError) => void {
    return (error: FetchError) => {
        if (error.response) {
            error.response.text().then(() => {
                dispatch(feiletAction());
            });
        } else {
            dispatch(feiletAction());
        }
    };
}

export async function fetchToJson<T>(url: string, config: RequestInit): Promise<T> {
    const respons = await fetch(url, config);
    const gyldigRespons = sjekkStatuskode(respons);
    return await toJson(gyldigRespons);
}

class FetchError extends Error {
    public response: Response;

    constructor(reason: string, response: Response) {
        super(reason);
        this.response = response;
    }
}

export function sjekkStatuskode(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new FetchError(response.statusText || response.type, response);
}

export function toJson(response: Response) {
    if (response.status === 204) {
        // No content
        return null;
    }
    return response.json();
}

export const fetchData = <S, D>(state: S, setState: Dispatch<SetStateAction<S>>, url: string): Promise<D | void> => {
    setState({ ...state, status: STATUS.PENDING });
    const fetchAsync = async () => {
        const data = await fetchToJson<D>(url, requestConfig);
        setState({ ...state, data: data, status: STATUS.OK });
        return Promise.resolve(data);
    };
    return fetchAsync().catch((err) => {
        setState({ ...state, status: STATUS.ERROR });
        return Promise.reject(err);
    });
};
