import type { Product } from "@/shared/types";
import type { GetProductsRequestParams } from "@/shared/services/product.service";
import { Category } from "@/shared/types";

export type ListView = 'list' | 'grid';
export type ProductShape = 'column' | 'row';
export type SortProductOptions = keyof Pick<Product, 'title' | 'price' | 'rating' | 'stock' | 'brand'>;
export type OrderProductOptions = 'asc' | 'desc';
export type ProductOptions = GetProductsRequestParams;
export type ProductQueryParams = {
    categories?: Category[];
    title?: string;
    sortBy: keyof Pick<Product, 'title' | 'price' | 'rating' | 'stock' | 'brand'>;
    order: 'asc' | 'desc';
    brand?: string;
    minPrice: number;
    maxPrice?: number;
    minRating: number;
    inStock?: boolean;
}