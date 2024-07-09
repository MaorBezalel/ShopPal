import { Schema } from 'express-validator';
import { Gender } from '@/shared/types/enums.types';

export const loginByUsernameSchema: Schema = {
    username: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Username is required!',
        },
        contains: {
            options: /^[a-zA-Z0-9_]*$/,
            negated: true,
            errorMessage: 'Username should only contain letters, numbers and underscores',
        },
        isString: true,
        trim: true,
        toLowerCase: true,
    },

    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Password is required!',
        },
        isStrongPassword: {
            options: {
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                returnScore: false,
            },
            errorMessage:
                'Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
        },
        isLength: {
            options: { min: 6, max: 18 },
            errorMessage: 'Password should be between 6 and 18 letters',
        },
        isString: true,
        trim: true,
    },
};

export const loginByEmailSchema: Schema = {
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Email is required!',
        },
        isEmail: {
            errorMessage: 'Invalid email!',
        },
        isString: true,
        trim: true,
        toLowerCase: true,
    },

    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Password is required!',
        },
        isStrongPassword: {
            options: {
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                returnScore: false,
            },
            errorMessage:
                'Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
        },
        isLength: {
            options: { min: 6, max: 18 },
            errorMessage: 'Password should be between 6 and 18 letters',
        },
        isString: true,
        trim: true,
    },
};

export const signupSchema: Schema = {
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Email is required!',
        },
        isEmail: {
            errorMessage: 'Invalid email!',
        },
        isString: true,
        trim: true,
        toLowerCase: true,
    },

    username: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Username is required!',
        },
        isLength: {
            options: { min: 3 },
            errorMessage: 'Username should be at least 3 letters',
        },
        isString: true,
        contains: {
            options: /^[a-zA-Z0-9_]*$/,
            errorMessage: 'Username should only contain letters, numbers and underscores',
        },
        trim: true,
        toLowerCase: true,
    },

    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Password is required!',
        },
        isStrongPassword: {
            options: {
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                returnScore: false,
            },
            errorMessage:
                'Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
        },
        isLength: {
            options: { min: 6, max: 18 },
            errorMessage: 'Password should be between 6 and 18 letters',
        },
        isString: true,
        trim: true,
    },

    gender: {
        in: ['body'],
        toLowerCase: true,
        isIn: {
            options: [Object.values(Gender)],
            errorMessage: 'gender can only be `male`, `female` or `other`',
        },
        customSanitizer: {
            options: (value) => {
                return Gender[(value as string).toUpperCase() as keyof typeof Gender];
            },
        },
    },

    name_details: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Name details are required!',
        },
        isObject: {
            errorMessage: 'Name details must be an object!',
        },
    },

    'name_details.first_name': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'First name is required!',
        },
        isString: true,
        trim: true,
    },

    'name_details.middle_name': {
        in: ['body'],
        default: { options: '' },
        isString: true,
        trim: true,
    },

    'name_details.last_name': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Last name is required!',
        },
        isString: true,
        trim: true,
    },

    address: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Address is required!',
        },
        isObject: {
            errorMessage: 'Address must be an object!',
        },
    },

    'address.country': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Country is required!',
        },
        isString: true,
        trim: true,
    },

    'address.city': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'City is required!',
        },
        isString: true,
        trim: true,
    },

    'address.street': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Street is required!',
        },
        isString: true,
        trim: true,
    },
};
