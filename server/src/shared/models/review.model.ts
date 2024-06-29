import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User, Product } from '@/shared/models';

@Entity('Review')
export class Review {
    @PrimaryColumn('uuid')
    product_id: string;

    @PrimaryColumn('uuid')
    user_id: string;

    @Column({ type: 'real' })
    rating: number;

    @Column({ type: 'text' })
    comment: string;

    @Column({ type: 'date' })
    date: Date;

    @ManyToOne(() => User, (user: User) => user.reviews)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
    user: Promise<User>;

    @ManyToOne(() => Product, (product) => product.reviews)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'product_id' })
    product: Promise<Product>;
}
