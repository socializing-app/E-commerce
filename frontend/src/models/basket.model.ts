import { ProductVariant } from "./product.model";

export interface BasketProduct extends ProductVariant {
    quantity: number;
    productID: number;
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