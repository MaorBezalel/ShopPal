import { useEffect, useState } from 'react';

/**
 * A custom hook that returns a boolean indicating whether the specified media query matches the current viewport.
 * @param query - The media query to match against.
 * @returns A boolean indicating whether the specified media query matches the current viewport.
 */
export function useMediaQuery(query: string): boolean {
    const getMatches = (query: string): boolean => {
        // Prevents SSR issues
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    const handleChange = (): void => {
        setMatches(getMatches(query));
    };

    // Update matches state on change
    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        // Triggered at the first client-side load and if the query changes
        handleChange();

        // Listen matchMedia
        matchMedia.addEventListener('change', handleChange);

        // Clean up
        return () => matchMedia.removeEventListener('change', handleChange);
    }, [query]);

    return matches;
}
