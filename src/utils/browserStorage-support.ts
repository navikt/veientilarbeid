import { erDemo } from './app-state-utils';

export interface BrowserStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}

export const hentStorage = ((): (() => BrowserStorage) => {
    const storageCache: { storage?: Storage } = {};

    return () => {
        if (!storageCache.storage) {
            storageCache.storage = finnBrowserStorage();
        }
        return storageCache.storage;
    };
})();

function finnBrowserStorage(): Storage {
    const storageType = erDemo() ? 'sessionStorage' : 'localStorage';
    return window[storageType] as Storage;
}
