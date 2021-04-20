import { useEffect, useRef, useState } from 'react';

export function useBrowserStorage(key: string, defaultValue: any) {
    return useStorage(key, defaultValue);
}

function useStorage(
    key: string,
    defaultValue: any,
    { serialize = JSON.stringify, deserialize = JSON.parse, storage = window.localStorage } = {}
) {
    const [state, setState] = useState(() => {
        const itemInStorage = storage.getItem(key);
        if (itemInStorage) {
            return deserialize(itemInStorage);
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
        storage.setItem(key, serialize(state));
    }, [key, state, serialize]);

    return [state, setState];
}
