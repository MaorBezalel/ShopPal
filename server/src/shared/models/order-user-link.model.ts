import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User, Order } from '.';

@Entity('OrderUserLink')
export class OrderUserLink {
    @PrimaryColumn('uuid')
    order_id: string;

    @PrimaryColumn('uuid')
    product_id: string;

    @ManyToOne(() => Order, (order) => order.orderUserLinks)
    order: Promise<Order>;

    @ManyToOne(() => User, (user) => user.orderUserLinks)
    user: Promise<User>;
}
