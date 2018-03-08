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