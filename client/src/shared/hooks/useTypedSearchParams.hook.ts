import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


export function useTypedSearchParams<T extends object>(initialTypedParams: T, convertFromURLToTyped: (urlParams: Record<string, string>) => T) {
  const [rawSearchParams, setRawSearchParams] = useSearchParams();
  const [typedSearchParams, setTypedSearchParams] = useState<T>(initialTypedParams);

  const setStateAndSearchParams = useCallback((newState: Partial<T>) => {
    setTypedSearchParams((prevState) => {
      return { ...prevState, ...newState };
    });
  }, []);

  useEffect(() => {
    const newTypedSearchParams = initialTypedParams;

    for (const [key, value] of rawSearchParams.entries()) {
        newTypedSearchParams[key as keyof T] = value as any;
    }

    setTypedSearchParams(convertFromURLToTyped(newTypedSearchParams as Record<string, string>));
  }, []);


  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(typedSearchParams)) {
      if (value !== null && value !== undefined) {
        newSearchParams.set(key, value.toString());
      }
    }

    setRawSearchParams(newSearchParams); 
  }, [typedSearchParams]); 



  return [typedSearchParams, setStateAndSearchParams] as const;
}