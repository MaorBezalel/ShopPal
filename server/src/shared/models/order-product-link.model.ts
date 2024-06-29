import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order, Product } from '@/shared/models';

@Entity('OrderProductLink')
export class OrderProductLink {
    @PrimaryColumn('uuid')
    order_id: string;

    @PrimaryColumn('uuid')
    product_id: string;

    @Column({ type: 'integer' })
    quantity: number;

    @ManyToOne(() => Order, (order) => order.orderProductLinks)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'order_id' })
    order: Promise<Order>;

    @ManyToOne(() => Product, (product) => product.orderProductLinks)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'product_id' })
    product: Promise<Product>;
}
