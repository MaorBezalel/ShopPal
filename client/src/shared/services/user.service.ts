import { useCallback } from 'react';
import type { User } from '@/shared/types/entities.types';
import type { ResponseError } from '../types/api.types';
import { AxiosInstance } from 'axios';

export type SignupRequest = Partial<User>;
export type LoginRequest = {
    email?: string;
    password: string;
    username?: string;
};
export type UpdateUserRequest = Partial<User>;

export type SignupResponse = {
    user: User;
    accessToken: string;
};
export type LoginResponse = {
    user: User;
    accessToken: string;
};
export type UpdateUserResponse = {
    user: Partial<User>;
};
export type DeleteUserResponse = {
    message: string;
};
export type LogoutResponse = {
    message: string;
};

export type useUserServiceProps = {
    PRIVATE_API: AxiosInstance;
    PUBLIC_API: AxiosInstance;
};

export const useUserService = ({ PRIVATE_API, PUBLIC_API }: useUserServiceProps) => {
    const signup = useCallback(
        async (userDetails: SignupRequest): Promise<SignupResponse | ResponseError> => {
            const response = await PUBLIC_API.post('/user/signup', userDetails);
            return response.data;
        },
        [PUBLIC_API]
    );

    const login = useCallback(
        async (userDetails: LoginRequest): Promise<LoginResponse | ResponseError> => {
            let response;

            if (userDetails.email) {
                response = await PUBLIC_API.post('/user/loginByEmail', userDetails);
            } else {
                response = await PUBLIC_API.post('/user/loginByUsername', userDetails);
            }
            return response.data;
        },
        [PUBLIC_API]
    );

    const logout = useCallback(async (): Promise<LogoutResponse | ResponseError> => {
        const response = await PUBLIC_API.post('/user/logout');
        return response.data;
    }, [PUBLIC_API]);

    const updateUser = useCallback(
        async (userDetails: UpdateUserRequest, userId: string): Promise<UpdateUserResponse | ResponseError> => {
            const response = await PRIVATE_API.patch(`/user/${userId}`, userDetails);
            return response.data;
        },
        [PRIVATE_API]
    );

    const deleteUser = useCallback(
        async (userId: string): Promise<DeleteUserResponse | ResponseError> => {
            const response = await PRIVATE_API.delete(`/user/${userId}`);
            return response.data;
        },
        [PRIVATE_API]
    );

    return { signup, login, logout, updateUser, deleteUser };
};
