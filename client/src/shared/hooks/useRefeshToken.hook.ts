import { useAuth } from '@/shared/hooks/useAuth.hook';
import { useCallback } from 'react';
import { useApi } from './useApi.hook';

export const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { authApi } = useApi();

    const refresh = useCallback(async () => {
        const response = await authApi.refreshToken();

        if ('accessToken' in response) {
            setAuth({ user: response.user, accessToken: response.accessToken });
        }
    }, []);

    return refresh;
};
