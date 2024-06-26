import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from '../types/types';

@Entity('Product')
class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'enum', enum: Category })
    category: Category;

    @Column({ type: 'real' })
    price: number;

    @Column({ type: 'real' })
    rating: number;

    @Column({ type: 'integer' })
    stock: number;

    @Column({ type: 'text', array: true, nullable: true })
    images: string[];

    @Column({ type: 'text', nullable: true })
    thumbnail: string;

    @Column({ type: 'text', nullable: true })
    brand: string;

    @Column({ type: 'text', nullable: true })
    return_policy: string;

    @Column({ type: 'text', nullable: true })
    shipping_info: string;

    @Column({ type: 'text', nullable: true })
    warranty_into: string;

    @Column(() => Dimension)
    dimension: Dimension;
}

class Dimension {
    @Column({ type: 'real', nullable: true })
    width: number;

    @Column({ type: 'real', nullable: true })
    height: number;

    @Column({ type: 'real', nullable: true })
    depth: number;

    @Column({ type: 'real', nullable: true })
    weight: number;
}
