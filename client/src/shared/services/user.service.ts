import { API } from '.';
import type { User } from '@/shared/types/entities.types';
import type { ResponseError } from '../types/api.types';

export type SignupRequest = Partial<User>;
export type LoginRequest = {
    email?: string;
    password: string;
    username?: string;
};
type UpdateUserRequest = Partial<User>;

type SignupResponse = {
    user: User;
    accessToken: string;
};
type LoginResponse = {
    user: User;
    accessToken: string;
};
type UpdateUserResponse = {
    user: Partial<User>;
};
type DeleteUserResponse = {
    message: string;
};
type LogoutResponse = {
    message: string;
};

export const signup = async (userDetails: SignupRequest): Promise<SignupResponse | ResponseError> => {
    const response = await API.post('/user/signup', userDetails);
    return response.data;
};

export const login = async (userDetails: LoginRequest): Promise<LoginResponse | ResponseError> => {
    let response;

    if (userDetails.email) {
        response = await API.post('/user/loginByEmail', userDetails);
    } else {
        response = await API.post('/user/loginByUsername', userDetails);
    }
    return response.data;
};

export const logout = async (): Promise<LogoutResponse | ResponseError> => {
    const response = await API.post('/user/logout');
    return response.data;
};

export const updateUser = async (
    userDetails: UpdateUserRequest,
    userId: string
): Promise<UpdateUserResponse | ResponseError> => {
    const response = await API.put(`/users/${userId}`, userDetails);
    return response.data;
};

export const deleteUser = async (userId: string): Promise<DeleteUserResponse | ResponseError> => {
    const response = await API.delete(`/users/${userId}`);
    return response.data;
};
