import { erDemo } from './app-state-utils';

export const hentStorage = ((): (() => Storage) => {
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
