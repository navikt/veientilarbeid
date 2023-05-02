import { requestConfig, STATUS } from './api';
import { Dispatch, SetStateAction } from 'react';

export async function fetchToJson<T>(url: string, config: RequestInit): Promise<T> {
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
    if (
        response.status === 204 ||
        (response.status === 201 && !/application\/json/.test(response.headers.get('Content-Type')!))
    ) {
        // 204 No content
        // 201 Created med tom respons tilbake
        return null;
    }

    return response.json();
}

export const fetchData = <S, D>(
    state: S,
    setState: Dispatch<SetStateAction<S>>,
    url: string,
    config = requestConfig()
) => {
    setState({ ...state, status: STATUS.PENDING });

    fetchToJson<D>(url, config)
        .then((data) => {
            setState({ ...state, data: data, status: STATUS.OK });
        })
        .catch((err) => {
            setState({ ...state, status: STATUS.ERROR });
        });
};
