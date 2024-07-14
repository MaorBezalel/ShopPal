import { API } from '.';
import { ResponseError } from '@/shared/types/api.types';

export type RefreshTokenResponse = {
    accessToken: string;
};

export const refreshToken = async (): Promise<RefreshTokenResponse | ResponseError> => {
    const response = await API.post('/auth/refresh');
    return response.data;
};
