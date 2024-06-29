import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Address } from '@/shared/types/embedded-entites';
import { OrderUserLink, OrderProductLink } from '@/shared/models';

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    order_id: string;

    @Column({ type: 'date' })
    issued_time: Date;

    @Column({ type: 'text' })
    order_status: string;

    @Column({ type: 'text', nullable: true })
    billing_info: string;

    @Column({ type: 'jsonb' })
    delivery_address: Address;

    @OneToMany(() => OrderUserLink, (orderUserLink) => orderUserLink.order)
    orderUserLinks: Promise<OrderUserLink[]>;

    @OneToMany(() => OrderProductLink, (orderProductLink) => orderProductLink.order)
    orderProductLinks: Promise<OrderProductLink[]>;
}
