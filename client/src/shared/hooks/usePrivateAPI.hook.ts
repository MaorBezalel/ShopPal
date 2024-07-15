import { useEffect } from 'react';
import { API_PRIVATE } from '../services';
import { useRefreshToken } from '@/shared/hooks/useRefeshToken.hook';
import { useAuth } from './useAuth.hook';

export function usePrivateAPI() {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestInterceptor = API_PRIVATE.interceptors.request.use(
            (request) => {
                if (!request.headers['Authorization']) {
                    request.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return request;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = API_PRIVATE.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                // when access token is expired
                if (error?.response.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return API_PRIVATE(prevRequest);
                }
            }
        );

        return () => {
            API_PRIVATE.interceptors.request.eject(requestInterceptor);
            API_PRIVATE.interceptors.request.eject(responseInterceptor);
        };
    }, [auth, refresh]);

    return API_PRIVATE;
}
