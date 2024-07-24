import { InsertResult, DeleteResult, UpdateResult } from 'typeorm';
import { AppDataSource } from '@/shared/db/pg.data-source';
import { Cart } from '@/shared/models/relationships';
import { Product } from '@/shared/models/entities';

export type CartRepositoryType = {
    getUserCartWithProducts: (user_id: string) => Promise<Cart[]>;
    addProductToCart: (user_id: string, product_id: string, quantity: number) => Promise<InsertResult>;
    removeProductFromCart: (user_id: string, product_id: string) => Promise<DeleteResult>;
    removeAllProductsFromCart: (user_id: string) => Promise<DeleteResult>;
};

export const CartRepository = AppDataSource.getRepository(Cart).extend({
    // Retrieve a user's cart with all products
    getUserCartWithProducts: async (user_id: string): Promise<Cart[]> => {
        return AppDataSource.createQueryBuilder()
            .select('cart')
            .from(Cart, 'cart')
            .leftJoinAndSelect('cart.product', 'product')
            .where('cart.user_id = :user_id', { user_id })
            .getMany();
    },

    // Retrieve products by their IDs
    getProductsByIds: async (productIds: string[]): Promise<Product[]> => {
        return AppDataSource.createQueryBuilder()
            .select('product')
            .from(Product, 'product')
            .whereInIds(productIds)
            .getMany();
    },

    // Add a new product to a user's cart
    addProductToCart: async (
        user_id: string,
        product_id: string,
        quantity: number
    ): Promise<UpdateResult | InsertResult> => {
        const updateResult = await AppDataSource.createQueryBuilder()
            .update(Cart)
            .set({ quantity: () => `quantity + ${quantity}` })
            .where('user_id = :user_id AND product_id = :product_id', { user_id, product_id })
            .execute();

        if (updateResult.affected === 0) {
            return AppDataSource.createQueryBuilder()
                .insert()
                .into(Cart)
                .values({ user_id: user_id, product_id: product_id, quantity: quantity })
                .execute();
        }

        return updateResult;
    },

    // Remove a product from the cart
    removeProductFromCart: async (user_id: string, product_id: string): Promise<DeleteResult> => {
        return AppDataSource.createQueryBuilder()
            .delete()
            .from(Cart)
            .where('user_id = :user_id AND product_id = :product_id', { user_id, product_id })
            .execute();
    },

    // Remove all products from a user's cart
    removeAllProductsFromCart: async (user_id: string): Promise<DeleteResult> => {
        return AppDataSource.createQueryBuilder()
            .delete()
            .from(Cart)
            .where('user_id = :user_id', { user_id })
            .execute();
    },
});
