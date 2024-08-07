import { Category } from '@/shared/types';
import type { Product } from '@/shared/types';
import type { ProductQueryParams } from '../Products.types';

export const formatCategoryName = (category: Category) =>
    category
        .toLowerCase()
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

export const convertProductOptionsToStringRepresentation = (params: ProductQueryParams) => {
    const result: Record<string, string> = {};

    if (params.sortBy !== undefined) {
        result.sortBy = params.sortBy.toString();
    }

    if (params.order !== undefined) {
        result.order = params.order.toString();
    }

    if (params.minPrice !== undefined) {
        result.minPrice = params.minPrice.toString();
    }

    if (params.minRating !== undefined) {
        result.minRating = params.minRating.toString();
    }

    if (params.categories !== undefined && params.categories.length > 0) {
        result.categories = params.categories.map((cat) => cat.toString()).join(',');
    }

    if (params.title !== undefined) {
        result.title = params.title.toString();
    }

    if (params.brand !== undefined) {
        result.brand = params.brand.toString();
    }

    if (params.maxPrice !== undefined) {
        result.maxPrice = params.maxPrice.toString();
    }

    if (params.inStock !== undefined) {
        result.inStock = params.inStock.toString();
    }

    return result;
};

export const convertURLParamsRepresentationToProductOptions = (obj: Record<string, string>): ProductQueryParams => {
    const params: ProductQueryParams = {
        sortBy: (obj.sortBy as keyof Pick<Product, 'title' | 'price' | 'rating' | 'stock' | 'brand'>) || 'title',
        order: (obj.order as 'asc' | 'desc') || 'asc',
        minPrice: parseInt(obj.minPrice || '0'),
        maxPrice: parseInt(obj.maxPrice) || undefined,
        minRating: parseFloat(obj.minRating || '0'),
        title: obj.title?.toString() || undefined,
        brand: obj.brand?.toString() || undefined,
        inStock: obj.inStock === 'true' || undefined,
    };

    if (obj.categories.toString().trim() !== '') {
        params.categories = obj.categories.split(',').map((cat) => cat as Category);
    }

    return params;
};
