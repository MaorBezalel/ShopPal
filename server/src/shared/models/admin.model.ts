import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '.';

@Entity('Admin')
export class Admin extends User {
    @Column('date')
    admin_since: Date;
}
