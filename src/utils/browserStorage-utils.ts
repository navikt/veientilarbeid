import { hentStorage } from './browserStorage-support';

export const hentFraBrowserStorage = (key: string): string | null => {
    try {
        return hentStorage().getItem(key);
    } catch (e) {
        return null;
    }
};

export const hentEllerSettFraBrowserStorage = (key: string, defaultVerdi: string): string => {
    const fraLocalStorage = hentFraBrowserStorage(key);
    if (!fraLocalStorage) {
        settIBrowserStorage(key, defaultVerdi);
        return defaultVerdi;
    }
    return fraLocalStorage;
};

export const settIBrowserStorage = (key: string, value: string): void => {
    try {
        hentStorage().setItem(key, value);
    } catch (e) {
        // Ignorer manglende localStorage. Enten full disk, privat nettlesermodus, eller annet lignende.
    }
};

export const fjernFraBrowserStorage = (key: string): void => {
    try {
        hentStorage().removeItem(key);
    } catch (e) {
        // Uproblematisk å ikke få slettet dersom localStorage mangler
    }
};
