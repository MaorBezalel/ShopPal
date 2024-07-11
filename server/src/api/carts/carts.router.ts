import { Router } from 'express';

//import {
//    getCartSchema, // no auth + auth
//    addToCartSchema, // auth
//    removeSpecificProductFromCartSchema // auth
//    removeAllProductsFromCartSchema, // auth
//} from './product.validator';

const router = Router();

router.get('/');
router.post('/:user_id');
router.delete('/:user_id/:product_id');
router.delete('/:user_id');

export default router;
// getCartSchema
// 1) auth -> req.JwtDecodedData -> if avliable -> user logged in -> query on user_id to get all cart items
// 2) auth -> req.JwtDecodedData -> if no avaliable -> user not logged in -> req.body filled with product_id's from client local storage -> query to get all product items
