import { useLayoutEffect, useState } from 'react';
import { useAuth } from './useAuth.hook';
import { SERVER_URL } from '@/shared/constants';
import axois from 'axios';
import { RefreshTokenResponse } from '../services/auth.service';
import { useNavigate } from 'react-router';

export function usePrivateAPI() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const [PRIVATE_API] = useState(() => {
        const privateAPI = axois.create({
            baseURL: SERVER_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        return privateAPI;
    });

    useLayoutEffect(() => {
        const authorizationHeaderRequestInterceptor = PRIVATE_API.interceptors.request.use(
            (request) => {
                if (!request.headers['Authorization']) {
                    request.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return request;
            },
            (error) => Promise.reject(error)
        );

        const expiredAccessTokenResponseInterceptor = PRIVATE_API.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                // when access token is expired
                if (error?.response.status === 401 && !prevRequest?.sent) {
                    try {
                        console.log('Refreshing token...', error?.config);
                        prevRequest.sent = true;
                        const refreshResponse = await PRIVATE_API.get('/auth/refresh-token');
                        const refreshData = refreshResponse.data as RefreshTokenResponse;
                        setAuth({ user: refreshData.user, accessToken: refreshData.accessToken });
                        prevRequest.headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
                        return PRIVATE_API(prevRequest);
                    } catch (error) {
                        navigate('/auth');
                        return Promise.reject(error);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            PRIVATE_API.interceptors.request.eject(authorizationHeaderRequestInterceptor);
            PRIVATE_API.interceptors.response.eject(expiredAccessTokenResponseInterceptor);
        };
    }, [auth]);

    return PRIVATE_API;
}
