import { Schema } from 'express-validator';
import { OrderStatus } from '@/shared/types/enums/db.types';

export const getOrdersSchema: Schema = {
    user_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "user_id"!',
    },
    limit: {
        in: ['query'],
        optional: true,
        isInt: {
            options: { min: 1, max: 30 },
            errorMessage: 'Limit must be a number between 1 and 30!',
        },
        toInt: true,
        errorMessage: 'Unknown validation error occurred for parameter "limit"!',
    },
    offset: {
        in: ['query'],
        optional: true,
        isInt: {
            options: { min: 0 },
            errorMessage: 'Offset must be a number greater than or equal to 0!',
        },
        toInt: true,
        errorMessage: 'Unknown validation error occurred for parameter "offset"!',
    },
};

export const createOrderForGuestUserSchema: Schema = {
    product_ids: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Product IDs are required!',
        },
        isArray: {
            options: { min: 1 },
            errorMessage: 'Product IDs must be an array with at least one product ID!',
        },
        custom: {
            // For now we will not validate the UUIDs, but we will keep the code here for future reference
            // options: (value) => {
            //     const uuidRegex = '[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}';

            //     if (!Array.isArray(value)) return false; // check if it's an array
            //     if (value.length === 0) return false; // check if it's not empty
            //     if (new Set(value).size !== value.length) return false; // check if all elements are unique
            //     if (value.some((id) => !id.match(uuidRegex))) return false; // check if all elements are valid UUIDs

            //     return true;
            // },
            errorMessage: 'Product IDs must be valid UUIDs!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "product_ids"!',
    },

    quantities: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Quantities are required!',
        },
        isArray: {
            options: { min: 1 },
            errorMessage: 'Quantities must be an array!',
        },
        custom: {
            options: (quantities, { req }) => {
                const productIds = req.body.product_ids;

                // TODO: Maybe we should use `switch true` for better code readability
                if (!Array.isArray(quantities)) throw new Error('Quantities must be an array!');
                if (quantities.some((quantity) => !Number.isInteger(quantity) || quantity < 1))
                    throw new Error('Each quantity must be an integer greater than 0!');
                if (!Array.isArray(productIds) || quantities.length !== productIds.length)
                    throw new Error('Quantities must have the same length as product IDs!');

                return true;
            },
        },
        errorMessage: 'Unknown validation error occurred for parameter "quantity"!',
    },

    issued_time: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Issued time is required!',
        },
        isDate: {
            options: {
                format: 'YYYY-MM-DD HH:mm:ss',
                strictMode: true,
            },
            errorMessage: 'Issued time must be a valid date in the format "YYYY-MM-DD HH:mm:ss"!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "issued_time"!',
    },

    // TODO: Maybe we should expect an object here instead of a string, since this could be a composite type containing multiple fields such as:
    // 1. Full name
    // 2. Billing address
    // 3. Phone
    // 4. Email
    // 5. Payment method
    // 6. Card number
    // 7. Expiration date
    // 8. CVV
    billing_info: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Billing info is required!',
        },
        isString: {
            errorMessage: 'Billing info must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "billing_info"!',
    },

    delivery_address: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Delivery address is required!',
        },
        isObject: {
            errorMessage: 'Delivery address must be an object!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address"!',
    },
    'delivery_address.country': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Country is required!',
        },
        isString: {
            errorMessage: 'Country must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address.country"!',
    },
    'delivery_address.city': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'City is required!',
        },
        isString: {
            errorMessage: 'City must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address.city"!',
    },
    'delivery_address.street': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Street is required!',
        },
        isString: {
            errorMessage: 'Street must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address.street"!',
    },
};

export const createOrderForAuthenticatedUserSchema: Schema = {
    user_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (theProvidedUserId, { req }) => theProvidedUserId === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "user_id"!',
    },

    product_ids: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Product IDs are required!',
        },
        isArray: {
            options: { min: 1 },
            errorMessage: 'Product IDs must be an array with at least one product ID!',
        },
        custom: {
            // For now we will not validate the UUIDs, but we will keep the code here for future reference
            // options: (value) => {
            //     const uuidRegex = '[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}';

            //     if (!Array.isArray(value)) return false; // check if it's an array
            //     if (value.length === 0) return false; // check if it's not empty
            //     if (new Set(value).size !== value.length) return false; // check if all elements are unique
            //     if (value.some((id) => !id.match(uuidRegex))) return false; // check if all elements are valid UUIDs

            //     return true;
            // },
            errorMessage: 'Product IDs must be valid UUIDs!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "product_ids"!',
    },

    quantities: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Quantities are required!',
        },
        isArray: {
            options: { min: 1 },
            errorMessage: 'Quantities must be an array!',
        },
        custom: {
            options: (quantities, { req }) => {
                const productIds = req.body.product_ids;

                // TODO: Maybe we should use `switch true` for better code readability
                if (!Array.isArray(quantities)) throw new Error('Quantities must be an array!');
                if (quantities.some((quantity) => !Number.isInteger(quantity) || quantity < 1))
                    throw new Error('Each quantity must be an integer greater than 0!');
                if (!Array.isArray(productIds) || quantities.length !== productIds.length)
                    throw new Error('Quantities must have the same length as product IDs!');

                return true;
            },
        },
        errorMessage: 'Unknown validation error occurred for parameter "quantity"!',
    },

    issued_time: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Issued time is required!',
        },
        isDate: {
            options: {
                format: 'YYYY-MM-DD HH:mm:ss',
                strictMode: true,
            },
            errorMessage: 'Issued time must be a valid date in the format "YYYY-MM-DD HH:mm:ss"!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "issued_time"!',
    },

    // TODO: Maybe we should expect an object here instead of a string, since this could be a composite type containing multiple fields such as:
    // 1. Full name
    // 2. Billing address
    // 3. Phone
    // 4. Email
    // 5. Payment method
    // 6. Card number
    // 7. Expiration date
    // 8. CVV
    billing_info: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Billing info is required!',
        },
        isString: {
            errorMessage: 'Billing info must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "billing_info"!',
    },

    delivery_address: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Delivery address is required!',
        },
        isObject: {
            errorMessage: 'Delivery address must be an object!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address"!',
    },
    'delivery_address.country': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Country is required!',
        },
        isString: {
            errorMessage: 'Country must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address.country"!',
    },
    'delivery_address.city': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'City is required!',
        },
        isString: {
            errorMessage: 'City must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address.city"!',
    },
    'delivery_address.street': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Street is required!',
        },
        isString: {
            errorMessage: 'Street must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address.street"!',
    },
};

export const updateOrderSchema: Schema = {
    order_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Order ID is required!',
        },
        isUUID: {
            errorMessage: 'Order ID must be a valid UUID!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "order_id"!',
    },

    user_id: {
        in: ['body'],

        notEmpty: {
            errorMessage: 'User ID is required!',
        },

        // TODO: In the future it might change so that only admins can update orders. For now, we will keep it as though only the user who created the order can update it.
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID!',
        },

        errorMessage: 'Unknown validation error occurred for parameter "user_id"!',
    },

    order_status: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Order status must be a string!',
        },
        toLowerCase: true,
        isIn: {
            options: [Object.values(OrderStatus)],
            errorMessage: `Order status must be one of the following: ${Object.values(OrderStatus).join(', ')}`,
        },
        errorMessage: 'Unknown validation error occurred for parameter "order_status"!',
    },

    delivery_address: {
        in: ['body'],
        optional: true,
        isObject: {
            errorMessage: 'Delivery address must be an object!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address"!',
    },
    'delivery_address.country': {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Country must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address.country"!',
    },
    'delivery_address.city': {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'City must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address.city"!',
    },
    'delivery_address.street': {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Street must be a string!',
        },
        trim: true,
        errorMessage: 'Unknown validation error occurred for parameter "delivery_address.street"!',
    },
};

export const deleteOrderSchema: Schema = {
    order_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Order ID is required!',
        },
        isUUID: {
            errorMessage: 'Order ID must be a valid UUID!',
        },
        errorMessage: 'Unknown validation error occurred for parameter "order_id"!',
    },

    user_id: {
        in: ['body'],

        notEmpty: {
            errorMessage: 'User ID is required!',
        },

        // TODO: In the future it might change so that only admins can update orders. For now, we will keep it as though only the user who created the order can update it.
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID!',
        },

        errorMessage: 'Unknown validation error occurred for parameter "user_id"!',
    },
};
