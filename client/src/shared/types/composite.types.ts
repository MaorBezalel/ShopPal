export type NameDetails = {
    first_name: string;
    middle_name?: string;
    last_name: string;
};

export type Address = {
    country: string;
    city: string;
    street: string;
};

export type Dimension = {
    width?: number;
    height?: number;
    depth?: number;
    weight?: number;
};
