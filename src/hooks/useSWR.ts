import useSwr, { SWRConfiguration } from 'swr';
import { nanoid } from 'nanoid';

import useSwrImmutable from 'swr/immutable';

export const fetcher = async (path: string, opts?: RequestInit & { onError?: (response: any) => void }) => {
    const response = await fetch(path, {
        headers: {
            'Content-Type': 'application/json',
            'NAV-Call-Id': nanoid(),
        },
        ...opts,
        credentials: 'include',
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('401');
        } else if (typeof opts?.onError === 'function') {
            return opts.onError(response);
        }
        throw new Error(response.statusText);
    }

    if (response.status === 204) {
        return null;
    }

    return await response.json();
};

function useSWR<T>(url: string, options?: SWRConfiguration) {
    return useSwr<T, any>(url, fetcher, options);
}

function useSWRImmutable(url: string, options?: SWRConfiguration) {
    return useSwrImmutable(url, fetcher, options);
}

export { useSWR, useSWRImmutable };
