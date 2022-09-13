import useSwr from 'swr';

export const fetcher = async (path: string, opts?: RequestInit & { onError?: (response: any) => void }) => {
    const response = await fetch(path, {
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

    const contentType = response.headers.get('Content-Type');
    if (contentType && /application\/json/.test(contentType)) {
        return await response.json();
    }
};

function useSWR<T>(url: string) {
    return useSwr<T, any>(url, fetcher);
}

export default useSWR;
