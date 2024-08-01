import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { AppDataSource } from '@/shared/db/pg.data-source';
import { Order, Product } from '@/shared/models/entities';
import { OrderUserLink, OrderProductLink } from '@/shared/models/relationships';
import { GetOrdersRequestProps } from '@/api/orders/order.types';
import { GetOrdersResponseProps } from '@/api/orders/order.types';
import { OrderStatus } from '@/shared/types/enums/db.types';
import { PGDataTransformer } from '@/shared/utils/helpers';
import { Address } from '@/shared/models/composites';

export const OrderRepository = AppDataSource.getRepository(Order).extend({
	async getOrders({ user_id, limit, offset }: GetOrdersRequestProps): Promise<GetOrdersResponseProps> {
		const orders = await this.createQueryBuilder('o')
			.select([
				'o.order_id',
				'o.issued_time',
				'o.order_status',
				'o.delivery_address',
				'o.billing_info',
				'json_agg(json_build_object(' +
					"'product_id', opl.product_id, " +
					"'quantity', opl.quantity, " +
					"'title', p.title, " +
					"'thumbnail', p.thumbnail, " +
					"'price', p.price" +
					')) as products',
			])
			.innerJoin(OrderUserLink, 'oul', 'o.order_id = oul.order_id')
			.innerJoin(OrderProductLink, 'opl', 'o.order_id = opl.order_id')
			.innerJoin(Product, 'p', 'opl.product_id = p.product_id')
			.where('oul.user_id = :user_id', { user_id })
			.groupBy('o.order_id')
			.addGroupBy('o.issued_time')
			.addGroupBy('o.order_status')
			.addGroupBy('o.delivery_address')
			.addGroupBy('o.billing_info')
			.offset(offset)
			.limit(limit)
			.orderBy('o.issued_time', 'DESC')
			.addOrderBy('o.order_id', 'ASC')
			.getRawMany();

		return orders.map((order) => ({
			order_id: order.o_order_id,
			issued_time: order.o_issued_time,
			order_status: order.o_order_status,
			delivery_address: PGDataTransformer.fromPGCompositeType(Address)(order.o_delivery_address),
			billing_info: order.o_billing_info,
			products: order.products,
		}));
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

	async updateProductsStock(product_ids: string[], new_stocks: number[]): Promise<UpdateResult[]> {
		return Promise.all(
			product_ids.map((product_id, index) =>
				this.createQueryBuilder()
					.update(Product)
					.set({ stock: new_stocks[index] })
					.where('product_id = :product_id', { product_id })
					.execute()
			)
		);
	},
});
