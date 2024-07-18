import { AppDataSource } from '@/shared/db/pg.data-source';
import { DeleteResult, UpdateResult, InsertResult } from 'typeorm';
import { Product } from '@/shared/models/entities';
import { Nullable } from '@/shared/types/utils.types';
import {
    deleteProductParameters,
    getManyProductsParameters,
    getOneProductParameters,
    updateProductParameters,
} from './product.types';

type ProductRepositoryType = {
    getProductById: (getOneProductParams: getOneProductParameters) => Promise<Nullable<Product>>;
    updateProductById: (
        updatedProductDetails: Partial<Product>,
        updateProductParams: updateProductParameters
    ) => Promise<UpdateResult>;
    deleteProductById: (deleteProductParams: deleteProductParameters) => Promise<DeleteResult>;
    addProduct: (product: Product) => Promise<InsertResult>;
    getProducts: (getManyProductsParameters: getManyProductsParameters) => Promise<Product[]>;
};

const ProductRepository: ProductRepositoryType = AppDataSource.getRepository(Product).extend({
    getProductById: ({ product_id }: getOneProductParameters) =>
        AppDataSource.createQueryBuilder()
            .select('product')
            .from(Product, 'product')
            .where('product.product_id = :productId', { productId: product_id })
            .getOne(),

    updateProductById: (updatedProductDetails: Partial<Product>, { product_id }: updateProductParameters) =>
        AppDataSource.createQueryBuilder()
            .update(Product)
            .set(updatedProductDetails)
            .where('product_id = :productId', { productId: product_id })
            .execute(),

    deleteProductById: ({ product_id }: deleteProductParameters) =>
        AppDataSource.createQueryBuilder()
            .delete()
            .from(Product)
            .where('product_id = :productId', { productId: product_id })
            .execute(),

    addProduct: (product: Product) =>
        AppDataSource.createQueryBuilder().insert().into(Product).values(product).execute(),

    getProducts: ({
        offset,
        limit,
        categories,
        title,
        sortBy,
        order,
        brand,
        minPrice,
        maxPrice,
        minRating,
        inStock,
    }: getManyProductsParameters) => {
        const query = AppDataSource.createQueryBuilder()
            .select('product')
            .from(Product, 'product')
            .where('product.price >= :minPrice', { minPrice })
            .andWhere('product.rating >= :minRating', { minRating });

        if (categories !== undefined) {
            query.andWhere('product.category IN (:...categories)', { categories: categories });
        }
        if (title !== undefined) {
            query.andWhere('product.title ILIKE :title', { title: `%${title}%` });
        }
        if (brand !== undefined) {
            query.andWhere('product.brand ILIKE :brand', { brand: `%${brand}%` });
        }
        if (maxPrice !== undefined) {
            query.andWhere('product.price <= :maxPrice', { maxPrice });
        }
        if (inStock !== undefined) {
            inStock ? query.andWhere('product.stock > 0') : query.andWhere('product.stock = 0');
        }

        query.offset(offset).limit(limit);

        if (sortBy === 'title') {
            query.orderBy({ [`product.title`]: order });
        } else {
            query.orderBy({ [`product.${sortBy}`]: order, 'product.title': 'ASC' });
        }

        return query.getMany();
    },
});

export default ProductRepository;
