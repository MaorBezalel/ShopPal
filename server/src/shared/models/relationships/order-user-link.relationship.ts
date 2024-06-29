import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User, Order } from '@/shared/models/entities';

@Entity('OrderUserLink')
export class OrderUserLink {
    @PrimaryColumn('uuid')
    order_id: string;

    @PrimaryColumn('uuid')
    product_id: string;

    @ManyToOne(() => Order, (order) => order.orderUserLinks)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'order_id' })
    order: Promise<Order>;

    @ManyToOne(() => User, (user) => user.orderUserLinks)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
    user: Promise<User>;
}
