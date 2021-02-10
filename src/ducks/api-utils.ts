import { requestConfig, STATUS } from './api';
import { Dispatch, SetStateAction } from 'react';

async function fetchToJson<T>(url: string, config: RequestInit): Promise<T> {
    const respons = await fetch(url, config);
    const gyldigRespons = sjekkStatuskode(respons);
    return toJson(gyldigRespons);
}

class FetchError extends Error {
    public response: Response;

    constructor(reason: string, response: Response) {
        super(reason);
        this.response = response;
    }
}

function sjekkStatuskode(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new FetchError(response.statusText || response.type, response);
}

function toJson(response: Response) {
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
