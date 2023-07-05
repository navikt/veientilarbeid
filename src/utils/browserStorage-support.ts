import { erDemo } from './app-state-utils';

export interface BrowserStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}

export const hentStorage = ((): (() => BrowserStorage) => {
    const storageCache: { storage?: BrowserStorage } = {};

    return () => {
        if (!storageCache.storage) {
            storageCache.storage = finnTilgjengeligBrowserStorage();
        }
        return storageCache.storage;
    };
})();

function finnTilgjengeligBrowserStorage(): BrowserStorage {
    const storageType = erDemo() ? 'sessionStorage' : 'localStorage';
    if (!erStorageTilgjengelig(storageType)) {
        return lagFallbackBrowserStorage();
    }

    return window[storageType] as Storage;
}

export function lagFallbackBrowserStorage(): BrowserStorage {
    const lagring: { [k: string]: string | null } = {};

    return {
        getItem(key: string) {
            return lagring[key] ?? null;
        },
        removeItem(key: string): void {
            delete lagring[key];
        },
        setItem(key: string, value: string): void {
            lagring[key] = value;
        },
    };
}

function erStorageTilgjengelig(storageType: 'sessionStorage' | 'localStorage') {
    try {
        const storage = window[storageType] as Storage;
        const testKey = '__storageTest__';
        storage.setItem(testKey, 'true');
        storage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}
