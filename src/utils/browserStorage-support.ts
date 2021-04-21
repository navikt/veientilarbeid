import { erDemo } from './app-state-utils';

export function hentStorage(): Storage {
    const storageType = erDemo() ? window.sessionStorage : window.localStorage;
    return storageType;
}
