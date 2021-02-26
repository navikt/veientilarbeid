export const hentFraLocalStorage = (key: string): string | null => {
    return window.localStorage.getItem(key);
};

export const settILocalStorage = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
};

export const slettFraLocalStorage = (key: string): void => {
    window.localStorage.removeItem(key);
};
