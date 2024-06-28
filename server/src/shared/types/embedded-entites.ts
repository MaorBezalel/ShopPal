export class NameDetails {
    first_name: string;
    last_name: string;
    middle_name?: string;

    constructor() {
        this.first_name = '';
        this.last_name = '';
        this.middle_name = '';
    }
}

export class Address {
    country: string;
    city: string;
    street: string;

    constructor() {
        this.country = '';
        this.city = '';
        this.street = '';
    }
}

export class Dimension {
    width: number;
    height: number;
    depth: number;
    weight: number;
}
