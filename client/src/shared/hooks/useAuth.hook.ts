import { AuthContext } from '@/shared/contexts/Auth.provider';
import { useContext } from 'react';

/**
 * Hook to get the auth context from the AuthProvider.
 * Can only be used within an AuthProvider.
 *
 * @returns The auth context
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
