import { useEffect, useState } from 'react';

/**
 * Debounces a value for a specified delay.
 * @template TValue The type of the value being debounced.
 * @param {TValue} value The value to debounce.
 * @param {number} [delay=500] The delay in milliseconds to debounce the value.
 * @returns {TValue} The debounced value.
 */
export default function useDebounce<TValue>(value: TValue, delay: number = 500): TValue {
    const [debouncedValue, setDebouncedValue] = useState<TValue>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
