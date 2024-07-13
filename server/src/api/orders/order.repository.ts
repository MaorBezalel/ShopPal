import { InsertResult, UpdateResult, DeleteResult, SelectQueryBuilder } from 'typeorm';
import { AppDataSource } from '@/shared/db/pg.data-source';
import { Order, Product } from '@/shared/models/entities';
import { OrderUserLink, OrderProductLink } from '@/shared/models/relationships';
import { GetOrdersRequestProps } from '@/api/orders/order.types';
import { GetOrdersResponseProps } from '@/api/orders/order.types';
import { OrderStatus } from '@/shared/types/enums/db.types';

export const OrderRepository = AppDataSource.getRepository(Order).extend({
    async getOrders({ user_id, limit, offset }: GetOrdersRequestProps): Promise<GetOrdersResponseProps> {
        return this.createQueryBuilder('o')
            .select([
                'o.order_id',
                'o.issued_time',
                'o.order_status',
                'o.delivery_address',
                'o.billing_info',
                'opl.product_id',
                'opl.quantity',
                'p.title',
                'p.thumbnail',
            ])
            .innerJoin(OrderUserLink, 'oul', 'o.order_id = oul.order_id')
            .innerJoin(OrderProductLink, 'opl', 'o.order_id = opl.order_id')
            .innerJoin(Product, 'p', 'opl.product_id = p.product_id')
            .where('oul.user_id = :user_id', { user_id })
            .take(limit)
            .skip(offset)
            .getRawMany() as Promise<GetOrdersResponseProps>;
    },

    async insertOneOrder(order: Order): Promise<InsertResult> {
        return this.createQueryBuilder().insert().into(Order).values(order).execute();
    },

    async insertManyOrderUserLink(orderUserLinks: OrderUserLink[]): Promise<InsertResult> {
        return this.createQueryBuilder().insert().into(OrderUserLink).values(orderUserLinks).execute();
    },

    async insertManyOrderProductLink(orderProductLinks: OrderProductLink[]): Promise<InsertResult> {
        return this.createQueryBuilder().insert().into(OrderProductLink).values(orderProductLinks).execute();
    },

    async updateOrder(order_id: string, orderToUpdateDetails: Partial<Order>): Promise<UpdateResult> {
        console.log('orderToUpdateDetails', orderToUpdateDetails);
        return this.createQueryBuilder()
            .update(Order)
            .set(orderToUpdateDetails)
            .where('order_id = :order_id', { order_id })
            .execute();
    },

    async deleteOrder(order_id: string): Promise<DeleteResult> {
        return this.createQueryBuilder().delete().from(Order).where('order_id = :order_id', { order_id }).execute();
    },

    async isOrderBelongToUser(order_id: string, user_id: string): Promise<boolean> {
        const query = this.createQueryBuilder('o')
            .innerJoin(OrderUserLink, 'oul', 'o.order_id = oul.order_id')
            .where('o.order_id = :order_id', { order_id })
            .andWhere('oul.user_id = :user_id', { user_id });

        return (await query.getCount()) > 0;
    },

    async checkOrderStatus(order_id: string, orderStatus: OrderStatus): Promise<boolean> {
        const query = this.createQueryBuilder('o')
            .select('1')
            .where('o.order_id = :order_id', { order_id })
            .andWhere('o.order_status = :orderStatus', { orderStatus });

        return (await query.getCount()) > 0;
    },
});
