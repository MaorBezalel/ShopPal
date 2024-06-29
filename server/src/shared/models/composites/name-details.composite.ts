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
