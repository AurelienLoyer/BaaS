import { Cart } from "src/carts/entities/cart.entity";

export interface User {
    id: number;
    email: string;
    password: string;
    cart: Cart;
}