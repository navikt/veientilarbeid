import useSwr from 'swr';
import useSwrImmutable from 'swr/immutable';

export const fetcher = async (path: string, opts?: RequestInit & { onError?: (response: any) => void }) => {
    const response = await fetch(path, {
        headers: {
            'Content-Type': 'application/json',
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

function useSWR<T>(url: string) {
    return useSwr<T, any>(url, fetcher);
}

function useSWRImmutable(url: string) {
    return useSwrImmutable(url, fetcher);
}

export { useSWR, useSWRImmutable };
