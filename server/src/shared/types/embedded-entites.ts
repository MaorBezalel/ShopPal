import { Column } from 'typeorm';

export class NameDetails {
    @Column({ type: 'text' })
    first_name: string;

    @Column({ type: 'text' })
    last_name: string;

    @Column({ type: 'text' })
    middle_name: string;
}

export class Address {
    @Column({ type: 'text', nullable: true })
    country: string;

    @Column({ type: 'text', nullable: true })
    city: string;

    @Column({ type: 'text', nullable: true })
    street: string;
}

export class Dimension {
    @Column({ type: 'real', nullable: true })
    width: number;

    @Column({ type: 'real', nullable: true })
    height: number;

    @Column({ type: 'real', nullable: true })
    depth: number;

    @Column({ type: 'real', nullable: true })
    weight: number;
}
