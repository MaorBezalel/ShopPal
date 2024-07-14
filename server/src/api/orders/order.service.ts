import { OrderRepository } from '@/api/orders/order.repository';
import { Order } from '@/shared/models/entities';
import { OrderProductLink, OrderUserLink } from '@/shared/models/relationships';
import AppError from '@/shared/exceptions/app-error';
import { OrderStatus } from '@/shared/types/enums/db.types';
import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';
import { GetOrdersRequestProps } from '@/api/orders/order.types';
import { GetOrdersResponseProps } from '@/api/orders/order.types';

export class OrderService {
    public static async getOrders({ user_id, limit, offset }: GetOrdersRequestProps): Promise<GetOrdersResponseProps> {
        return await OrderRepository.getOrders({ user_id, limit, offset });
    }

    public static async createNewOrder({
        issued_time,
        billing_info,
        delivery_address,
    }: Partial<Order>): Promise<Order> {
        const orderToCreate = {
            issued_time,
            billing_info,
            delivery_address,
            order_status: OrderStatus.PURCHASED,
        } as Order;
        const createdOrderResult = await OrderRepository.insertOneOrder(orderToCreate);
        orderToCreate.order_id = createdOrderResult.identifiers[0].order_id;

        return orderToCreate;
    }

    public static async createOrderProductLinks(
        order_id: string,
        product_ids: string[],
        quantities: number[]
    ): Promise<void> {
        const orderProductLinks = product_ids.map((product_id, index) => {
            return { order_id, product_id, quantity: quantities[index] } as OrderProductLink;
        });
        await OrderRepository.insertManyOrderProductLink(orderProductLinks);
    }

    public static async createOrderUserLink(order_id: string, user_id: string): Promise<void> {
        const orderUserLink = { order_id, user_id } as OrderUserLink;
        await OrderRepository.insertManyOrderUserLink([orderUserLink]);
    }

    public static async updateOrder(order_id: string, orderToUpdateDetails: Partial<Order>): Promise<void> {
        const result = await OrderRepository.updateOrder(order_id, orderToUpdateDetails);

        if (result.affected === 0) {
            throw new AppError('Could not update order, order not found', HttpStatusCode.NOT_FOUND, 'updateOrder');
        }
    }

    public static async deleteOrder(order_id: string): Promise<void> {
        const result = await OrderRepository.deleteOrder(order_id);

        if (result.affected === 0) {
            throw new AppError('Could not delete order, order not found', HttpStatusCode.NOT_FOUND, 'deleteOrder');
        }
    }

    public static async ensureOrderBelongsToUser(order_id: string, user_id: string): Promise<void> {
        const orderUserLink = await OrderRepository.isOrderBelongToUser(order_id, user_id);

        if (!orderUserLink) {
            throw new AppError('Order does not belong to user', HttpStatusCode.FORBIDDEN, 'ensureOrderBelongsToUser');
        }
    }

    public static async ensureOrderWasRecentlyPurchased(order_id: string): Promise<void> {
        const isOrderRecentlyPurchased = await OrderRepository.checkOrderStatus(order_id, OrderStatus.PURCHASED);

        if (!isOrderRecentlyPurchased) {
            throw new AppError(
                'Order was not recently purchased',
                HttpStatusCode.FORBIDDEN,
                'ensureOrderWasRecentlyPurchased'
            );
        }
    }

    public static async ensureThereAreValuesToUpdateWith(orderToUpdateDetails: Partial<Order>): Promise<void> {
        if (Object.values(orderToUpdateDetails).every((value) => !value)) {
            throw new AppError(
                'There are no values to update with',
                HttpStatusCode.BAD_REQUEST,
                'ensureThereAreValuesToUpdateWith'
            );
        }
    }
}
