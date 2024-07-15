import { Gender, Category, OrderStatus } from '@/shared/types/enum.types';
import { Address, NameDetails, Dimension } from '@/shared/types/composite.types';

export type User = {
    user_id: string;
    email: string;
    username: string;
    password: string;
    name_details: NameDetails;
    gender: Gender;
    phone?: string;
    birthday?: Date;
    avatar?: string;
    address: Address;
};

export type Admin = {
    admin_since: Date;
} & User;

export type Product = {
    product_id: string;
    title: string;
    description?: string;
    price: number;
    rating: number;
    thumbnail?: string;
    images?: string[];
    category: Category;
    stock: number;
    brand?: string;
    return_policy?: string;
    shipping_info?: string;
    warranty_info?: string;
    dimension?: Dimension;
};

export type Review = {
    product_id: string;
    user_id: string;
    rating: number;
    review: string;
    date: Date;
};

export type Order = {
    order_id: string;
    issued_time: Date;
    order_status: OrderStatus;
    billing_info?: string;
    delivery_address: Address;
};

export type CartItem = {
    user_id: string;
    product_id: string;
    quantity: number;
};

export type Cart = CartItem[];
