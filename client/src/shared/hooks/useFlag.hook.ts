import { Dispatch, SetStateAction, useState, useCallback } from 'react';

type UseFlagResult = {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
};

/**
 * Hook that returns a boolean value and functions to set it to true, false or toggle it.
 *
 * @param defaultValue The initial value of the flag.
 * @returns An object with the flag value and functions to set it to true, false or toggle it.
 */
export default function useFlag(defaultValue?: boolean): UseFlagResult {
    const [value, setValue] = useState(!!defaultValue);

    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);
    const toggle = useCallback(() => setValue((prevValue) => !prevValue), []);

    return { value, setValue, setTrue, setFalse, toggle };
}
