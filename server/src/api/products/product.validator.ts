import { Schema } from 'express-validator';
import { Category } from '@/shared/types/enums/db.types';


const getManyProductSchema: Schema = {
    limit: {
        in: ['query'],
        default: { options: 10 },
        isInt: {
            options: { min: 1 },
            errorMessage: 'limit must be an integer greater than 0'
        },
        toInt: true
    },
    offset: {
        in: ['query'],
        default: { options: 0 },
        isInt: {
            options: { min: 0 },
            errorMessage: 'offset must be an integer greater than or equal to 0'
        },
        toInt: true
    },
    sortBy: {
        in: ['query'],
        default: { options: 'title' },
        isString: {
            errorMessage: 'sortBy must be a string'
        },
        custom: {
            options: (sortBy: string) => ['title', 'price', 'rating', 'stock', 'brand'].includes(sortBy),
            errorMessage: 'sortBy must be one of title, price, rating, stock, brand'
        }
    },
    order: {
        in: ['query'],
        default: { options: 'asc' },
        isString: {
            errorMessage: 'order must be a string'
        },
        custom: {
            options: (order: string) => ['asc', 'desc'].includes(order),
            errorMessage: 'order must be one of asc, desc'
        },
        customSanitizer: {
            options: (order: string) => order.toUpperCase()
        }
    },
    categories: {
        in: ['query'],
        custom: {
            options: (commaSaperatedCategories: string) => commaSaperatedCategories.split(',').every(category => Object.values(Category).includes(category as Category)),
            errorMessage: 'categories must be an array of Category enum values'
        },
        customSanitizer: {
            options: (commaSaperatedCategories: string) => commaSaperatedCategories.split(',')
        },
        optional: true
    },
    title: {
        in: ['query'],
        isString: {
            errorMessage: 'title must be a string'
        },
        optional: true
    },
    brand: {
        in: ['query'],
        isString: {
            errorMessage: 'brand must be a string'
        },
        optional: true
    },
    minPrice: {
        in: ['query'],
        default: { options: 0 },
        isFloat: {
            options: { min: 0 },
            errorMessage: 'minPrice must be a float greater than or equal to 0'
        },
        toFloat: true
    },
    maxPrice: {
        in: ['query'],
        isFloat: {
            options: { min: 0 },
            errorMessage: 'maxPrice must be a float greater than or equal to 0'
        },
        toFloat: true,
        optional: true
    },
    minRating: {
        in: ['query'],
        default: { options: 0 },
        isFloat: {
            options: { min: 0, max: 5 },
            errorMessage: 'minRating must be a float between 0 and 5'
        },
        toFloat: true
    },
    inStock: {
        in: ['query'],
        isBoolean: {
            errorMessage: 'inStock must be a boolean'
        },
        toBoolean: true,
        optional: true
    }
};

const getOneProductSchema: Schema = {
    product_id: {
        in: ['params'],
        isUUID: {
            errorMessage: 'product id must be a valid UUID'
        }
    }
};

const createProductSchema: Schema = {
    title: {
        in: ['body'],
        isString: {
            errorMessage: 'title must be a string'
        },
        notEmpty: {
            errorMessage: 'title cannot be empty'
        }
    },
    description: {
        in: ['body'],
        isString: {
            errorMessage: 'description must be a string'
        },
        optional: true
    },
    price: {
        in: ['body'],
        isFloat: {
            options: { min: 0 },
            errorMessage: 'price must be a float greater than or equal to 0'
        }
    },
    rating: {
        in: ['body'],
        isFloat: {
            options: { min: 0, max: 5 },
            errorMessage: 'rating must be a float between 0 and 5'
        }
    },
    stock: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'stock must be a int greater than or equal to 0'
        }
    },
    category: {
        in: ['body'],
        isIn: {
            options: [Object.values(Category)],
            errorMessage: `category is not valid`
        }
    },
    brand: {
        in: ['body'],
        isString: {
            errorMessage: 'brand must be a string'
        },
        optional: true
    },
    dimension: {
        in: ['body'],
        customSanitizer: {
            options: (dimension) => {
                console.log('dimension: ' + dimension);
                if (dimension == null) {
                    return {
                        height: null,
                        width: null,
                        depth: null,
                        weight: null
                    };
                }
                return dimension;
            }
        },
        isObject: {
            errorMessage: 'dimension must be an object'
        }
    },
    'dimension.height': {
        in: ['body'],
        default: { options: null },
        custom: {
            options: (height: number) => height == null || (typeof height === 'number' && height >= 0),
            errorMessage: 'height must be a float greater than or equal to 0'
        }
    },
    'dimension.width': {
        in: ['body'],
        default: { options: null },
        custom: {
            options: (width: number) => width == null || (typeof width === 'number' && width >= 0),
            errorMessage: 'width must be a float greater than or equal to 0'
        }
    },
    'dimension.depth': {
        in: ['body'],
        default: { options: null },
        custom: {
            options: (depth: number) => depth == null || (typeof depth === 'number' && depth >= 0),
            errorMessage: 'depth must be a float greater than or equal to 0'
        }
    },
    'dimension.weight': {
        in: ['body'],
        default: { options: null },
        custom: {
            options: (weight: number) => weight == null || (typeof weight === 'number' && weight >= 0),
            errorMessage: 'weight must be a float greater than or equal to 0'
        }
    },
    images: {
        in: ['body'],
        isArray: {
            errorMessage: 'images must be an array'
        },
        custom: {
            options: (images: string[]) => images.every(image => typeof image === 'string' &&  /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(image)),
            errorMessage: 'images must be an array of URLs'
        },
        optional: true
    },
    thumbnail: {
        in: ['body'],
        isString: {
            errorMessage: 'thumbnail must be a string'
        },
        optional: true
    },
    return_policy: {
        in: ['body'],
        isString: {
            errorMessage: 'return policy must be a string'
        },
        optional: true
    },
    shipping_info: {
        in: ['body'],
        isString: {
            errorMessage: 'shipping info must be a string'
        },
        optional: true
    },
    warranty_info: {
        in: ['body'],
        isString: {
            errorMessage: 'warranty info must be a string'
        },
        optional: true
    }
}

const updateProductSchema: Schema = {
    product_id: {
        in: ['params'],
        isUUID: {
            errorMessage: 'product id must be a valid UUID'
        }
    },
    title: {
        in: ['body'],
        isString: {
            errorMessage: 'title must be a string'
        },
        notEmpty: {
            errorMessage: 'title cannot be empty'
        },
        optional: true
    },
    description: {
        in: ['body'],
        custom: {
            options: (description: string) => description == null || typeof description === 'string',
            errorMessage: 'description must be a string'
        },
        optional: true
    },
    price: {
        in: ['body'],
        isFloat: {
            options: { min: 0 },
            errorMessage: 'price must be a float greater than or equal to 0'
        },
        optional: true
    },
    rating: {
        in: ['body'],
        isFloat: {
            options: { min: 0, max: 5 },
            errorMessage: 'rating must be a float between 0 and 5'
        },
        optional: true
    },
    stock: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'stock must be a int greater than or equal to 0'
        },
        optional: true
    },
    category: {
        in: ['body'],
        isIn: {
            options: [Object.values(Category)],
            errorMessage: `category is not valid`
        },
        optional: true
    },
    brand: {
        in: ['body'],
        isString: {
            errorMessage: 'brand must be a string'
        },
        optional: true
    },
    dimension: {
        in: ['body'],
        custom: {
            options: (dimension) => dimension == null || typeof dimension === 'object',
        },
        customSanitizer: {
            options: (dimension) => {
                if (dimension == null) {
                    return {
                        height: null,
                        width: null,
                        depth: null,
                        weight: null
                    };
                }
                return dimension;
            }
        },
        optional: true
    },
    'dimension.height': {
        in: ['body'],
        custom: {
            options: (height: number) => height == null || (typeof height === 'number' && height >= 0),
            errorMessage: 'height must be a float greater than or equal to 0'
        },
        optional: true
    },
    'dimension.width': {
        in: ['body'],
        custom: {
            options: (width: number) => width == null || (typeof width === 'number' && width >= 0),
            errorMessage: 'width must be a float greater than or equal to 0'
        },
        optional: true
    },
    'dimension.depth': {
        in: ['body'],
        custom: {
            options: (depth: number) => depth == null || (typeof depth === 'number' && depth >= 0),
            errorMessage: 'depth must be a float greater than or equal to 0'
        },
        optional: true
    },
    'dimension.weight': {
        in: ['body'],
        custom: {
            options: (weight: number) => weight == null || (typeof weight === 'number' && weight >= 0),
            errorMessage: 'weight must be a float greater than or equal to 0'
        },
        optional: true
    },
    images: {
        in: ['body'],
        isArray: {
            errorMessage: 'images must be an array'
        },
        custom: {
            options: (images: string[]) => images.every(image => typeof image === 'string' &&  /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(image)),
            errorMessage: 'images must be an array of URLs'
        },
        optional: true
    },
    thumbnail: {
        in: ['body'],
        custom: {
            options: (thumbnail: string) => thumbnail == null || /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(thumbnail),
            errorMessage: 'thumbnail must be a URL'
        },
        optional: true
    },
    return_policy: {
        in: ['body'],
        custom: {
            options: (return_policy: string) => return_policy == null || typeof return_policy === 'string',
            errorMessage: 'return policy must be a string'
        },
        optional: true
    },
    shipping_info: {
        in: ['body'],
        custom: {
            options: (shipping_info: string) => shipping_info == null || typeof shipping_info === 'string',
            errorMessage: 'shipping info must be a string'
        },
        optional: true
    },
    warranty_info: {
        in: ['body'],
        custom: {
            options: (warranty_info: string) => warranty_info == null || typeof warranty_info === 'string',
            errorMessage: 'warranty info must be a string'
        },
        optional: true
    }
};

const deleteProductSchema: Schema = {
    product_id: {
        in: ['params'],
        isUUID: {
            errorMessage: 'product id must be a valid UUID'
        }
    }
};


export default {
    getManyProductSchema,
    getOneProductSchema,
    createProductSchema,
    updateProductSchema,
    deleteProductSchema
};