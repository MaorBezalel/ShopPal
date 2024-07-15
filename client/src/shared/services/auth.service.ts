import { ResponseError } from '@/shared/types/api.types';
import type { User } from '@/shared/types/entities.types';
import { useCallback } from 'react';
import { AxiosInstance } from 'axios';

export type RefreshTokenResponse = {
    accessToken: string;
    user: User;
};

type useAuthServiceProps = {
    PRIVATE_API: AxiosInstance;
};

export const useAuthService = ({ PRIVATE_API }: useAuthServiceProps) => {
    const refreshToken = useCallback(async (): Promise<RefreshTokenResponse | ResponseError> => {
        const response = await PRIVATE_API.get('/auth/refresh-token');

        return response.data;
    }, [PRIVATE_API]);

    return { refreshToken };
};
