import { InsertResult, DeleteResult } from 'typeorm';
import { AppDataSource } from '@/shared/db/pg.data-source';
import { Cart } from '@/shared/models/relationships';

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

    // Add a new product to a user's cart
    addProductToCart: async (user_id: string, product_id: string, quantity: number): Promise<InsertResult> => {
        return AppDataSource.createQueryBuilder()
            .insert()
            .into(Cart)
            .values({ user_id: user_id, product_id: product_id, quantity: quantity })
            .execute();
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