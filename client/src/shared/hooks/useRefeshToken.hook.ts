import { useAuth } from '@/shared/hooks/useAuth.hook';
import { refreshToken } from '@/shared/services/auth.service';
import { useCallback } from 'react';

export const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = useCallback(async () => {
        const response = await refreshToken();

        if ('accessToken' in response) {
            setAuth((prev) => (prev !== null ? { ...prev, accessToken: response.accessToken } : null));
        }
    }, []);

    return refresh;
};
