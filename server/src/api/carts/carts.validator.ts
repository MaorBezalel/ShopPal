import { Schema } from 'express-validator';

export const getLoggedUserCartSchema: Schema = {
    user_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID',
        },
    },
};

export const addProductToCartSchema: Schema = {
    user_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID',
        },
    },

    product_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Product ID is required!',
        },
        isUUID: {
            errorMessage: 'Product ID must be a valid UUID!',
        },
    },

    quantity: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Quantity is required!',
        },
        isInt: {
            errorMessage: 'Quantity must be a number!',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Quantity must be at least 1!',
        }
    },
};

export const removeProductFromCartSchema: Schema = {
    user_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID',
        },
    },

    product_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Product ID is required!',
        },
    },
};

export const removeAllProductsFromCartSchema: Schema = {
    user_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID',
        },
    },
};

