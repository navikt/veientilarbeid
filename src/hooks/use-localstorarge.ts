import { useEffect, useRef, useState } from 'react';

export function useLocalStorage(
    key: string,
    defaultValue: any,
    { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
    const [state, setState] = useState(() => {
        const itemInStorage = window.localStorage.getItem(key);
        if (itemInStorage) {
            return deserialize(itemInStorage);
        }
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue || '';
    });
    const prevKeyRef = useRef(key);

    useEffect(() => {
        const prevKey = prevKeyRef.current;
        if (prevKey !== key) {
            window.localStorage.removeItem(prevKey);
        }
        prevKeyRef.current = key;
        window.localStorage.setItem(key, serialize(state));
    }, [key, state, serialize]);

    return [state, setState];
}
