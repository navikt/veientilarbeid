export const fetcher = async (path: string) => {
    const response = await fetch(path, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Fetch request failed');
    }

    return await response.json();
};
