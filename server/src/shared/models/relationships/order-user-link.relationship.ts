import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User, Order } from '@/shared/models/entities';

@Entity('OrderUserLink')
export class OrderUserLink {
    @PrimaryColumn('uuid')
    order_id: string;

    @PrimaryColumn('uuid')
    user_id: string;

    @ManyToOne(() => Order, (order) => order.orderUserLinks)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'order_id' })
    order: Promise<Order>;

    @ManyToOne(() => User, (user) => user.orderUserLinks)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
    user: Promise<User>;
}

// creating order process:
// 1) req.body -> order details (of order table)
// 2) req.JwtDecodedData -> if avaliable - user logged in -> add order to order table, add order product link, add order user link
// 3) req.JwtDecodedData -> if not avaliable - user not logged in -> add order to order table, add order product link
