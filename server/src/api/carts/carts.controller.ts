import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';
import { CartService } from './carts.service';

export class CartController {

    public static async getCartWithProducts(req: Request, res: Response, next: NextFunction) {
        const userType = req.jwtDecodedPayload;
        if (!userType){
            const product_ids = req.body.product_ids;
            const products = await CartService.getProductsByIds(product_ids);
            res.status(HttpStatusCode.OK).json({ products });
        }
        else{
            const user_id = req.params.user_id;
            const userCart = await CartService.getUserCartWithProducts(user_id);
            res.status(HttpStatusCode.OK).json({ userCart });
        }
    }

    public static async addProductToCart(req: Request, res: Response, next: NextFunction) {
        const user_id = req.params.user_id;
        const product_id = req.body.product_id;
        const quantity = req.body.quantity;

        await CartService.addProductToCart(user_id, product_id, quantity);

        res.status(HttpStatusCode.CREATED).json({ message: 'Product added to cart successfully' });
    }

    public static async removeProductFromCart(req: Request, res: Response, next: NextFunction) {
        const user_id = req.params.user_id;
        const product_id = req.params.product_id;

        await CartService.removeProductFromCart(user_id, product_id);

        res.status(HttpStatusCode.OK).json({ message: 'Product removed from cart successfully' });
    }

    public static async removeAllProductsFromCart(req: Request, res: Response, next: NextFunction) {

        await CartService.removeAllProductsFromCart(req.params.user_id);

        res.status(HttpStatusCode.OK).json({ message: 'All products removed from cart successfully' });
    }
}