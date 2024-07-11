import { InsertResult, DeleteResult } from 'typeorm';
import { AppDataSource } from '@/shared/db/pg.data-source';
import { Cart } from '@/shared/models/relationships';

export type CartRepositoryType = {
    getUserCartWithProducts: (userId: string) => Promise<Cart[]>;
    addProductToCart: (userId: string, productId: string, quantity: number) => Promise<InsertResult>;
    removeProductFromCart: (userId: string, productId: string) => Promise<DeleteResult>;
    removeAllProductsFromCart: (userId: string) => Promise<DeleteResult>;
};

export const CartRepository = AppDataSource.getRepository(Cart).extend({

    // Retrieve a user's cart with all products
    getUserCartWithProducts: async (userId: string): Promise<Cart[]> => {
        return AppDataSource.createQueryBuilder()
            .select('cart')
            .from(Cart, 'cart')
            .leftJoinAndSelect('cart.product', 'product')
            .where('cart.user_id = :userId', { userId })
            .getMany();
    },

    // Add a new product to a user's cart
    addProductToCart: async (userId: string, productId: string, quantity: number): Promise<InsertResult> => {
        return AppDataSource.createQueryBuilder()
            .insert()
            .into(Cart)
            .values({ user_id: userId, product_id: productId, quantity: quantity })
            .execute();
    },

    // Remove a product from the cart
    removeProductFromCart: async (userId: string, productId: string): Promise<DeleteResult> => {
        return AppDataSource.createQueryBuilder()
            .delete()
            .from(Cart)
            .where('user_id = :userId AND product_id = :productId', { userId, productId })
            .execute();
    },

    // Remove all products from a user's cart
    removeAllProductsFromCart: async (userId: string): Promise<DeleteResult> => {
        return AppDataSource.createQueryBuilder()
            .delete()
            .from(Cart)
            .where('user_id = :userId', { userId })
            .execute();
    },
});