import { useState, useEffect } from 'react';

/**
 * A hook that allows storing and retrieving data from local storage.
 * @template TValue The type of the value to be stored in local storage.
 * @param key The key to be used for storing and retrieving the value from local storage.
 * @param initialValue The initial value to be stored in local storage if the key is not already present.
 * @returns A tuple containing the key, the stored value, and a function to update the stored value.
 */
export default function useLocalStorage<TValue>(
    key: string,
    initialValue: TValue
): [string, TValue, (value: TValue) => void] {
    const modifiedKey = `${window.location.pathname}:${key}`; // Ensures that the key is unique to the current page (useful when hosting on GitHub Pages)
    const [storedValue, setStoredValue] = useState<TValue>(() => {
        try {
            const itemInStorage = window.localStorage.getItem(modifiedKey);

            if (itemInStorage) {
                return JSON.parse(itemInStorage);
            }

            return initialValue instanceof Function ? initialValue() : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const valueToStore = storedValue instanceof Function ? storedValue() : storedValue;
            window.localStorage.setItem(modifiedKey, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    }, [storedValue]);

    return [modifiedKey, storedValue, setStoredValue];
}
