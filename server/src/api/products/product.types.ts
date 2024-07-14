import { Category } from "@/shared/types/enums/db.types";
import { Product } from "@/shared/models/entities";
import { Nullable } from "@/shared/types/utils.types";

export type getManyProductsParameters = {
    offset: number;
    limit: number;
    categories: Nullable<Category[]>;
    title: Nullable<string>;
    sortBy: Pick<Product, 'title' | 'price' | 'rating' | 'stock' | 'brand'>;
    order: 'ASC' | 'DESC';
    brand: Nullable<string>;
    minPrice: number;
    maxPrice: Nullable<number>;
    minRating: number;
    inStock: Nullable<boolean>;
};

export type getOneProductParameters = {
    product_id: string;
};

export type updateProductParameters = {
    product_id: string;
};

export type deleteProductParameters = {
    product_id: string;
};


export type createProductBody = Product;
export type updateProductBody = Partial<Product>;
