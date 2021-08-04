import { ActionWithPayload } from "../..";
import { State, BasketProduct } from "../../../models/basket.model";

export const addOrUpdateProduct = (state: State, action: ActionWithPayload) => {
    const foundProduct = state.products.find((product: BasketProduct) => product._id === action.payload._id);

    if ( !foundProduct ) return addProduct(state, action);
    else return updateProduct(state, foundProduct._id, true);
}

export const addProduct = (state: State, action: ActionWithPayload) => {
    return {
        ...state,
        products: [ ...state.products, { ...action.payload, quantity: 1 } ]
    };
}

export const updateProduct = (state: State, productID: string, increase: boolean) => {
    if ( !productID ) return state;

    let isZero: boolean = false;

    const products = state.products.map((product: BasketProduct) => {
        if ( product._id === productID ) {
            let quantity = increase ? (product.quantity as number) + 1 : (product.quantity as number) - 1;

            if ( quantity < 0 ) quantity = 0;

            if ( quantity === 0 ) isZero = true;

            return {
                ...product,
                quantity
            }
        } else return product;
    });

    if ( isZero ) return removeProduct(state, productID);

    return {
        ...state,
        products
    };
}

export const removeProduct = (state: State, productID: string) => {
    if ( !productID ) return state;

    const updatedProducts = state.products.filter((product: BasketProduct) => product._id !== productID);

    return {
        ...state,
        products: updatedProducts
    };
}