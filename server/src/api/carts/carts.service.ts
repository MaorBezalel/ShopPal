import { Cart } from "@/shared/models/relationships";
import { CartRepository } from "./carts.repository";
import AppError from '@/shared/exceptions/app-error';
import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';

export class CartService {
    public static async getUserCartWithProducts(user_id: string): Promise<Cart[]> {
        return await CartRepository.getUserCartWithProducts(user_id);
    }

    public static async addProductToCart(user_id: string, product_id: string, quantity: number): Promise<void> {
        const result = await CartRepository.addProductToCart(user_id, product_id, quantity);

        if (result.identifiers.length === 0) {
            throw new AppError('Could not add product to cart', HttpStatusCode.INTERNAL_SERVER_ERROR, 'addProductToCart');
        }
    }

    public static async removeProductFromCart(user_id: string, product_id: string): Promise<void> {
        const result = await CartRepository.removeProductFromCart(user_id, product_id);

        if (result.affected === 0) {
            throw new AppError('Could not remove product from cart', HttpStatusCode.NOT_FOUND, 'removeProductFromCart');
        }
    }

    public static async removeAllProductsFromCart(user_id: string): Promise<void> {
        const result = await CartRepository.removeAllProductsFromCart(user_id);

        if (result.affected === 0) {
            throw new AppError('Could not remove all products from cart', HttpStatusCode.NOT_FOUND, 'removeAllProductsFromCart');
        }
    }
}