import { ActionWithPayload } from "../..";
import { State, BasketProduct } from "../../../models/basket.model";

export const addOrUpdateProduct = (state: State, action: ActionWithPayload) => {
    const foundProduct = state.products.find((product: BasketProduct) => product.id === action.payload.id);

    if ( !foundProduct ) return addProduct(state, action);
    else return updateProduct(state, foundProduct.id, true);
}

export const addProduct = (state: State, action: ActionWithPayload) => {
    return {
        ...state,
        products: [ ...state.products, { ...action.payload, quantity: 1 } ]
    };
}

export const updateProduct = (state: State, productID: string, increase: boolean) => {
    if ( !productID ) return state;

    return {
        ...state,
        products: state.products.map((product: BasketProduct) => {
            if ( product.id === productID ) {
                let quantity = increase ? (product.quantity as number) + 1 : (product.quantity as number) - 1;

                if ( quantity < 0 ) quantity = 0;

                return {
                    ...product,
                    quantity
                }
            } else return product;
        })
    };
}

export const removeProduct = (state: State, productID: string) => {
    if ( !productID ) return state;

    const updatedProducts = state.products.filter((product: BasketProduct) => product.id !== productID);

    return {
        ...state,
        products: updatedProducts
    };
}