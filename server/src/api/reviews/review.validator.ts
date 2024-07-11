import { Schema } from 'express-validator';

export const getReviewsSchema: Schema = {
    product_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Product ID is required!',
        },
        isUUID: {
            errorMessage: 'Product ID must be a valid UUID!',
        },
    },
    limit: {
        in: ['query'],
        isInt: {
            options: { min: 1, max: 50 },
            errorMessage: 'Limit must be a number between 1 and 50!',
        },
        optional: true,
        toInt: true,
    },
    offset: {
        in: ['query'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Offset must be a number greater than or equal to 0!',
        },
        optional: true,
        toInt: true,
    },
    sortBy: {
        in: ['query'],
        isString: true,
        toLowerCase: true,
        isIn: {
            options: [['rating', 'date']],
            errorMessage: 'Sort by must be either "rating" or "date"!',
        },
        optional: true,
    },
    order: {
        in: ['query'],
        isString: true,
        toUpperCase: true,
        isIn: {
            options: [['ASC', 'DESC']],
            errorMessage: 'Order must be either "ASC" or "DESC"!',
        },
        optional: true,
    },
};

export const createReviewSchema: Schema = {
    product_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Product ID is required!',
        },
        isUUID: {
            errorMessage: 'Product ID must be a valid UUID!',
        },
    },
    user_id: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID!',
        },
    },
    rating: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Rating is required!',
        },
        isInt: {
            options: { min: 1, max: 5 },
            errorMessage: 'Rating must be a number between 1 and 5!',
        },
        toInt: true,
    },
    comment: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Comment is required!',
        },
        isString: {
            errorMessage: 'Comment must be a string!',
        },
    },
};

export const updateReviewSchema: Schema = {
    product_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Product ID is required!',
        },
        isUUID: {
            errorMessage: 'Product ID must be a valid UUID!',
        },
    },
    user_id: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID!',
        },
    },
    rating: {
        in: ['body'],
        optional: true,
        isInt: {
            options: { min: 1, max: 5 },
            errorMessage: 'Rating must be a number between 1 and 5!',
        },
        toInt: true,
    },
    comment: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Comment must be a string!',
        },
    },
};

export const deleteReviewSchema: Schema = {
    product_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Product ID is required!',
        },
        isUUID: {
            errorMessage: 'Product ID must be a valid UUID!',
        },
    },
    user_id: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID!',
        },
    },
};
