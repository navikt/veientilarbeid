import { useEffect, useRef, useState } from 'react';
import { hentStorage } from '../utils/browserStorage-support';

export function useBrowserStorage(key: string, defaultValue: any) {
    const storage = hentStorage();
    return useStorage(key, defaultValue, storage);
}

function useStorage(key: string, defaultValue: any, storage: Storage) {
    const [state, setState] = useState(() => {
        const itemInStorage = storage.getItem(key);
        if (itemInStorage) {
            return JSON.parse(itemInStorage);
        }
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue || '';
    });
    const prevKeyRef = useRef(key);

    useEffect(() => {
        const prevKey = prevKeyRef.current;
        if (prevKey !== key) {
            storage.removeItem(prevKey);
        }
        prevKeyRef.current = key;
        storage.setItem(key, JSON.stringify(state));
    }, [key, state, storage]);

    return [state, setState];
}
