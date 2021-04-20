import { useLocalStorage } from './use-localstorarge';

export function useBrowserStorage(key: string, defaultValue: any) {
    return useLocalStorage(key, defaultValue);
}
