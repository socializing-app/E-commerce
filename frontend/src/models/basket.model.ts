import { Product } from "./product.model";

export interface BasketProduct extends Product {
    quantity?: number;
}

export interface State {
    id: string;
    products: BasketProduct[];
    orderID: string;
    userID: string;
    status: string;
    created: Date;
}

export const initialState = {
    id: "",
    products: [],
    orderID: "",
    userID: "",
    status: "",
    created: new Date()
}