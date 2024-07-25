import { useState } from 'react';
import { SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useAuth, useApi, useFlag } from '@/shared/hooks';
import { FormInputs, LoginFormInputs, SignupFormInputs } from '@/pages/auth/types';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/shared/services/user.service';
import { ResponseError } from '@/shared/types/api.types';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

export type UseAuthFormActionsReturn<TFormValue extends 'login' | 'signup'> = {
    onSubmit: SubmitHandler<FormInputs<TFormValue>>;
    onError: SubmitErrorHandler<FormInputs<TFormValue>>;
    isLoading: boolean;
    error: ResponseError | null;
    setError: React.Dispatch<React.SetStateAction<ResponseError | null>>;
};

/**
 * A hook that returns the form submit and error handling functions, loading state, and error state for the auth form
 *
 * @returns {UseAuthFormActionsReturn} An object containing the form submit and error handling functions, loading state, and error state
 */
export function useAuthFormActions<TFormType extends 'login' | 'signup'>(): UseAuthFormActionsReturn<TFormType> {
    const { setAuth, setRememberMe } = useAuth();
    const { userApi } = useApi();
    const { value: isLoading, setValue: setIsLoading } = useFlag(false);
    const [error, setError] = useState<ResponseError | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (data: LoginFormInputs) => {
        setIsLoading(true); // start loading

        const isEmail = data.emailOrUsername.includes('@');
        const loginDetails: LoginRequest = isEmail
            ? { email: data.emailOrUsername, password: data.password }
            : { username: data.emailOrUsername, password: data.password };

        try {
            const loginResult = await userApi.login(loginDetails);
            processLoginResult(loginResult, data.rememberMe);
            navigate(`/profile/${(loginResult as LoginResponse).user.user_id}`);
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                setError(error.response?.data as ResponseError);
            }
        } finally {
            setIsLoading(false); // stop loading
        }
    };

    const handleSignup = async (data: SignupFormInputs) => {
        setIsLoading(true); // start loading

        const signupDetails: SignupRequest = {
            email: data.email,
            username: data.username,
            password: data.password,
            gender: data.gender,
            name_details: data.name_details,
            address: data.address,
        };

        try {
            const signupResult = await userApi.signup(signupDetails);
            processSignupResult(signupResult);
            navigate(`/profile/${(signupResult as SignupResponse).user.user_id}`);
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                setError(error.response?.data as ResponseError);
            }
        } finally {
            setIsLoading(false); // stop loading
        }
    };

    const processLoginResult = (result: Awaited<ReturnType<typeof userApi.login>> | undefined, rememberMe: boolean) => {
        if (result && 'accessToken' in result) {
            setAuth(result);
            setRememberMe(rememberMe);
        } else {
            console.error('An undefined error occurred during login:', result);
            setError(result as ResponseError);
        }
    };

    const processSignupResult = (result: Awaited<ReturnType<typeof userApi.signup>> | undefined) => {
        if (result && 'accessToken' in result) {
            setAuth(result);
        } else {
            console.error('An undefined error occurred during signup:', result);
            setError(result as ResponseError);
        }
    };

    const onSubmit: SubmitHandler<FormInputs<TFormType>> = async (data) => {
        if ('emailOrUsername' in data && data.emailOrUsername) {
            console.log('Login form data:', data);
            await handleLogin(data as LoginFormInputs);
        } else {
            console.log('Signup form data:', data);
            await handleSignup(data as SignupFormInputs);
        }
    };

    const onError: SubmitErrorHandler<FormInputs<TFormType>> = (errors) => {
        console.log('Form errors:', errors);
    };

    return { onSubmit, onError, isLoading, error, setError };
}
