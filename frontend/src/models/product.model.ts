export interface Product {
    id: string;
    name: string;
    colour?: string;
    price: number;
    currency?: string;
    images?: string[];
    thumbNail?: string;
    manufacturer?: string;
    model?: string;
    description?: string;
    reviews?: any;
    condition?: string;
    active?: boolean;
    tags?: string[];
    activeDiscountID?: string;
    discounts?: any[];
}

export interface State {
    products: Product[];
}

export const initialState = {
    products: []
}