import { Request, Response, NextFunction } from 'express';
import { OrderService } from '@/api/orders/order.service';
import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';
import {
    GetOrdersRequestProps,
    CreateOrderForGuestUserProps,
    CreateOrderForAuthenticatedUserProps,
    UpdateOrderProps,
    DeleteOrderProps,
} from '@/api/orders/order.types';

export class OrderController {
    public static async getOrders(req: Request, res: Response, next: NextFunction) {
        const getOrdersRequest = req.body as GetOrdersRequestProps;
        const orders = await OrderService.getOrders(getOrdersRequest);
        res.status(HttpStatusCode.OK).json(orders);
    }

    public static async createOrderForGuestUser(req: Request, res: Response, next: NextFunction) {
        const { product_ids, quantities, billing_info, delivery_address } = req.body as CreateOrderForGuestUserProps;
        const issued_time = new Date();
        const createdOrder = await OrderService.createNewOrder({ issued_time, billing_info, delivery_address });
        await OrderService.createOrderProductLinks(createdOrder.order_id, product_ids, quantities);
        res.status(HttpStatusCode.CREATED).json(createdOrder);
    }

    public static async createOrderForAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
        const { user_id, product_ids, quantities, billing_info, delivery_address } =
            req.body as CreateOrderForAuthenticatedUserProps;
        const issued_time = new Date();
        const createdOrder = await OrderService.createNewOrder({ issued_time, billing_info, delivery_address });
        await OrderService.createOrderProductLinks(createdOrder.order_id, product_ids, quantities);
        await OrderService.createOrderUserLink(createdOrder.order_id, user_id);
        res.status(HttpStatusCode.CREATED).json(createdOrder);
    }

    public static async updateOrder(req: Request, res: Response, next: NextFunction) {
        console.log('req.body', req.body);
        const { order_id, user_id, order_status, delivery_address } = req.body as UpdateOrderProps;
        await OrderService.ensureThereAreValuesToUpdateWith({ order_status, delivery_address });
        await OrderService.ensureOrderBelongsToUser(order_id, user_id);
        await OrderService.updateOrder(order_id, { order_status, delivery_address });
        res.status(HttpStatusCode.NO_CONTENT).send();
    }

    public static async deleteOrder(req: Request, res: Response, next: NextFunction) {
        const { order_id, user_id } = req.body as DeleteOrderProps;
        await OrderService.ensureOrderBelongsToUser(order_id, user_id);
        await OrderService.ensureOrderWasRecentlyPurchased(order_id);
        await OrderService.deleteOrder(order_id);
        res.status(HttpStatusCode.NO_CONTENT).send();
    }

    public static async updateProductsStocks(req: Request, res: Response, next: NextFunction) {
        const product_ids = req.body.product_ids;
        const new_stocks = req.body.new_stocks;
        await OrderService.updateProductsStock(product_ids, new_stocks);
        res.status(HttpStatusCode.NO_CONTENT).send();
    }
}
