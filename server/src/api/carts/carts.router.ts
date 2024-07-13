import { Router } from 'express';
import { getLoggedUserCartSchema, addProductToCartSchema, removeProductFromCartSchema, removeAllProductsFromCartSchema, getGuestCartSchema } from './carts.validator';
import { CartController } from './carts.controller';
import { checkSchema } from 'express-validator';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import authorizationMiddleware from '@/middlewares/authorization.middleware';
import tryCatchMiddleware from '@/middlewares/tryCatch.middleware';

const router = Router();

//route for getting products of guest cart.
router.get('/', 
    checkSchema(getGuestCartSchema), 
    validationMiddleware, 
    tryCatchMiddleware(CartController.getCartWithProducts));

//route for getting products of user cart.
router.get('/:user_id', 
    authorizationMiddleware,
    checkSchema(getLoggedUserCartSchema), 
    validationMiddleware, 
    tryCatchMiddleware(CartController.getCartWithProducts));

//route for adding product to user cart.
router.post('/:user_id', 
    authorizationMiddleware, 
    checkSchema(addProductToCartSchema), 
    validationMiddleware, 
    tryCatchMiddleware(CartController.addProductToCart));

//route for removing product from user cart.
router.delete('/:user_id/:product_id', 
    authorizationMiddleware, 
    checkSchema(removeProductFromCartSchema), 
    validationMiddleware, 
    tryCatchMiddleware(CartController.removeProductFromCart));

//route for removing all products from user cart.
router.delete('/:user_id', 
    authorizationMiddleware, 
    checkSchema(removeAllProductsFromCartSchema), 
    validationMiddleware, 
    tryCatchMiddleware(CartController.removeAllProductsFromCart));


export default router;
