import { Router } from 'express';
import { check, checkSchema } from 'express-validator';
import { OrderController } from '@/api/orders/order.controller';
import { validationMiddleware, authorizationMiddleware, tryCatchMiddleware } from '@/middlewares';
import {
    getOrdersSchema,
    createOrderForGuestUserSchema,
    createOrderForAuthenticatedUserSchema,
    updateOrderSchema,
    deleteOrderSchema,
    updateProductsStocksSchema,
} from '@/api/orders/order.validator';

const router = Router();

router.get(
    '/:user_id',
    authorizationMiddleware,
    checkSchema(getOrdersSchema),
    validationMiddleware,
    tryCatchMiddleware(OrderController.getOrders)
);

router.post(
    '/',
    checkSchema(createOrderForGuestUserSchema),
    validationMiddleware,
    tryCatchMiddleware(OrderController.createOrderForGuestUser)
);

router.post(
    '/:user_id',
    authorizationMiddleware,
    checkSchema(createOrderForAuthenticatedUserSchema),
    validationMiddleware,
    tryCatchMiddleware(OrderController.createOrderForAuthenticatedUser)
);

router.patch(
    '/:order_id',
    authorizationMiddleware,
    checkSchema(updateOrderSchema),
    validationMiddleware,
    tryCatchMiddleware(OrderController.updateOrder)
);

router.patch(
    '/',
    checkSchema(updateProductsStocksSchema),
    validationMiddleware,
    tryCatchMiddleware(OrderController.updateProductsStocks)
);

router.delete(
    '/:order_id',
    authorizationMiddleware,
    checkSchema(deleteOrderSchema),
    validationMiddleware,
    tryCatchMiddleware(OrderController.deleteOrder)
);

export default router;
