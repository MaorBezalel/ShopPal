import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User, Product } from '@/shared/models/entities';

@Entity('Cart')
export class Cart {
    @PrimaryColumn('uuid')
    user_id: string;

    @PrimaryColumn('uuid')
    product_id: string;

    @Column({ type: 'integer' })
    quantity: number;

    @ManyToOne(() => User, (user) => user.orderUserLinks)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
    user: Promise<User>;

    @ManyToOne(() => Product, (product) => product.orderProductLinks)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'product_id' })
    product: Promise<Product>;
}
