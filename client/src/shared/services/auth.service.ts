import { API } from '.';
import { ResponseError } from '@/shared/types/api.types';
import type { User } from '@/shared/types/entities.types';

export type RefreshTokenResponse = {
    accessToken: string;
    user: User;
};

export const refreshToken = async (): Promise<RefreshTokenResponse | ResponseError> => {
    const response = await API.get('/auth/refresh-token');
    return response.data;
};
