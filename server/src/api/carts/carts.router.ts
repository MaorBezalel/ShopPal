import { Router } from 'express';
import { getLoggedUserCartSchema, addProductToCartSchema, removeProductFromCartSchema, removeAllProductsFromCartSchema } from './carts.validator';
import { CartController } from './carts.controller';
import { checkSchema } from 'express-validator';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import authorizationMiddleware from '@/middlewares/authorization.middleware';
import tryCatchMiddleware from '@/middlewares/tryCatch.middleware';

//import {
//    getCartSchema, // no auth + auth
//    addToCartSchema, // auth
//    removeSpecificProductFromCartSchema // auth
//    removeAllProductsFromCartSchema, // auth
//} from './product.validator';

const router = Router();

// router.get('/');
// router.post('/:user_id');
// router.delete('/:user_id/:product_id');
// router.delete('/:user_id');


router.get('/:user_id', 
    authorizationMiddleware,
    checkSchema(getLoggedUserCartSchema), 
    validationMiddleware, 
    tryCatchMiddleware(CartController.getUserCartWithProducts));

router.post('/:user_id', 
    authorizationMiddleware, 
    checkSchema(addProductToCartSchema), 
    validationMiddleware, 
    tryCatchMiddleware(CartController.addProductToCart));

router.delete('/:user_id/:product_id', 
    authorizationMiddleware, 
    checkSchema(removeProductFromCartSchema), 
    validationMiddleware, 
    tryCatchMiddleware(CartController.removeProductFromCart));

router.delete('/:user_id', 
    authorizationMiddleware, 
    checkSchema(removeAllProductsFromCartSchema), 
    validationMiddleware, 
    tryCatchMiddleware(CartController.removeAllProductsFromCart));



export default router;
// getCartSchema
// 1) auth -> req.JwtDecodedData -> if avliable -> user logged in -> query on user_id to get all cart items
// 2) auth -> req.JwtDecodedData -> if no avaliable -> user not logged in -> req.body filled with product_id's from client local storage -> query to get all product items
