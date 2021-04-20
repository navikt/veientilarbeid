import { useEffect, useRef, useState } from 'react';

export function useBrowserStorage(key: string, defaultValue: any) {
    return useStorage(key, defaultValue);
}

function useStorage(key: string, defaultValue: any, storage = window.localStorage) {
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
