import { Entity, Column } from 'typeorm';
import { User } from '@/shared/models';

@Entity('Admin')
export class Admin extends User {
    @Column('date')
    admin_since: Date;
}
