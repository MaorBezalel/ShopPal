import { API } from '.';
import type { User } from '@/shared/types/entities.types';
import type { ResponseError } from '../types/api.types';

type SignupRequest = Partial<User>;
type LoginRequest = Pick<User, 'email' | 'password'> | Pick<User, 'username' | 'password'>;
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

export const signup = async (userDetails: SignupRequest): Promise<SignupResponse | ResponseError> => {
    const response = await API.post('/auth/signup', userDetails);
    return response.data;
};

export const login = async (userDetails: LoginRequest): Promise<LoginResponse | ResponseError> => {
    const response = await API.post('/auth/login', userDetails);
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
