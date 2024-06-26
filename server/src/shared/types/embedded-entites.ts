import { RegisterProperty } from '../decorators';
import { getRegisteredProperties } from '../decorators';
import { Transformer } from '../utils/helpers';

export class NameDetails {
    @RegisterProperty
    first_name: string;

    @RegisterProperty
    last_name: string;

    @RegisterProperty
    middle_name?: string;

    constructor() {
        this.first_name = '';
        this.last_name = '';
        this.middle_name = '';
    }

    static fromPGCompositeType(nameDetails: string): NameDetails {
        return Transformer.fromPGCompositeType(nameDetails, getRegisteredProperties(NameDetails));
    }

    static toPGCompositeType(nameDetails: NameDetails): string {
        console.log(`in toPGCompositeType of NameDetails: ${nameDetails}`);
        return Transformer.toPGCompositeType(nameDetails);
    }
}

export class Address {
    @RegisterProperty
    country: string;

    @RegisterProperty
    city: string;

    @RegisterProperty
    street: string;

    constructor() {
        this.country = '';
        this.city = '';
        this.street = '';
    }

    static fromPGCompositeType(address: string): Address {
        return Transformer.fromPGCompositeType(address, getRegisteredProperties(Address));
    }

    static toPGCompositeType(address: Address): string {
        return Transformer.toPGCompositeType(address);
    }
}

export class Dimension {
    @RegisterProperty
    width: number;

    @RegisterProperty
    height: number;

    @RegisterProperty
    depth: number;

    @RegisterProperty
    weight: number;

    static fromPGCompositeType(dimension: string): Dimension {
        return Transformer.fromPGCompositeType(dimension, getRegisteredProperties(Dimension));
    }

    static toPGCompositeType(dimension: Dimension): string {
        return Transformer.toPGCompositeType(dimension);
    }
}
