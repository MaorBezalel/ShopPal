import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Gender } from '../types/enums';
import { Address, NameDetails } from '../types/embedded-entites';
import { Review, OrderUserLink } from '.';
import { Transformer } from '../utils/helpers';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({
        type: 'text',
        transformer: {
            from: NameDetails.fromPGCompositeType,
            to: NameDetails.toPGCompositeType,
        },
    })
    name_details: NameDetails;

    @Column({ type: 'enum', enum: Gender })
    gender: Gender;

    @Column({ type: 'text', nullable: true })
    phone: string;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'date', nullable: true })
    birthday: string;

    @Column({ type: 'text', nullable: true })
    avatar: string;

    @Column({
        type: 'text',
        transformer: {
            from: Address.fromPGCompositeType,
            to: Address.toPGCompositeType,
        },
    })
    address: Address;

    @OneToMany(() => Review, (review) => review.user)
    reviews: Promise<Review[]>;

    @OneToMany(() => OrderUserLink, (orderUserLink) => orderUserLink.user)
    orderUserLinks: Promise<OrderUserLink[]>;
}
