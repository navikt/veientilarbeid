export const hentFraLocalStorage = (key: string): string | null => {
    try {
        return window.localStorage.getItem(key);
    } catch (e) {
        return null;
    }
};

export const settILocalStorage = (key: string, value: string): void => {
    try {
        window.localStorage.setItem(key, value);
    } catch (e) {
        // Ignorer manglende localStorage. Enten full disk, privat nettlesermodus, eller annet lignende.
    }
};

export const slettFraLocalStorage = (key: string): void => {
    try {
        window.localStorage.removeItem(key);
    } catch (e) {
        // Uproblematisk å ikke få slettet dersom localStorage mangler
    }
};
