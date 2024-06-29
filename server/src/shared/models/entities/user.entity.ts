import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from '@/shared/models/entities';
import { OrderUserLink } from '@/shared/models/relationships';
import { Address, NameDetails } from '@/shared/models/composites';
import { Gender } from '@/shared/types/enums.types';
import { PGDataTransformer } from '@/shared/utils/helpers';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({
        type: 'text',
        transformer: {
            from: PGDataTransformer.fromPGCompositeType(NameDetails),
            to: PGDataTransformer.toPGCompositeType(NameDetails),
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
            from: PGDataTransformer.fromPGCompositeType(Address),
            to: PGDataTransformer.toPGCompositeType(Address),
        },
    })
    address: Address;

    @OneToMany(() => Review, (review) => review.user)
    reviews: Promise<Review[]>;

    @OneToMany(() => OrderUserLink, (orderUserLink) => orderUserLink.user)
    orderUserLinks: Promise<OrderUserLink[]>;
}
