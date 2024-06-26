import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Gender } from '../types/types';
@Entity('User')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column(() => NameDetails)
    name_detail: NameDetails;

    @Column({ type: 'enum', enum: Gender })
    gender: Gender;

    @Column({ type: 'text', nullable: true })
    phone: string;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column({ type: 'text', nullable: true })
    avatar: string;

    @Column(() => Address)
    address: Address;
}

class NameDetails {
    @Column({ type: 'text' })
    first_name: string;

    @Column({ type: 'text' })
    last_name: string;

    @Column({ type: 'text' })
    middle_name: string;
}

class Address {
    @Column({ type: 'text', nullable: true })
    country: string;

    @Column({ type: 'text', nullable: true })
    city: string;

    @Column({ type: 'text', nullable: true })
    street: string;
}
