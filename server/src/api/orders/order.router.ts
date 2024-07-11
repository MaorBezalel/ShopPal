import { Router } from 'express';
//import {
//    getOrdersSchema, // auth
//    createOrderSchema, // no auth
//    updateOrderSchema, // auth (would probably be used by 3rd party order management system)
//    deleteOrderSchema, // auth (would probably be used by 3rd party payment system after the user received refund)
//} from './product.validator';

const router = Router();

router.get('/:user_id');
router.post('/');
router.put('/:order_id');
router.delete('/:order_id');

export default router;
