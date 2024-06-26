import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Address } from '../types/embedded-entites';

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

    @Column(() => Address)
    delivery_address: Address;
}
