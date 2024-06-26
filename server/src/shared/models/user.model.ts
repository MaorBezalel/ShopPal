import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Gender } from '../types/enums';
import { Address, NameDetails } from '../types/embedded-entites';
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
