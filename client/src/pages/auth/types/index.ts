import { Gender } from '@/shared/types';
import { AuthFormProps } from '@/pages/auth/components';

export type LoginFormInputs = {
    emailOrUsername: string;
    password: string;
    rememberMe: boolean;
};

export type SignupFormInputs = {
    email: string;
    username: string;
    password: string;
    gender: Gender;
    name_details: {
        first_name: string;
        middle_name: string;
        last_name: string;
    };
    address: {
        country: string;
        city: string;
        street: string;
    };
};

// Helper type that returns the correct form inputs type based on formType
export type FormInputs<T extends AuthFormProps['formType']> = T extends 'login' ? LoginFormInputs : SignupFormInputs;
