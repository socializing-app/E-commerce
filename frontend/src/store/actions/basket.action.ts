import { BasketProduct } from "../../models/basket.model";

export const ActionTypes = {
    ADD: "[Basket] Add item",
    INCREASE: "[Basket] Increase item quantity",
    DECREASE: "[Basket] Decrease item quantity",
    REMOVE: "[Basket] Remove item"
}

export const AddItem = ( payload: BasketProduct ) => { 
    return { type: ActionTypes.ADD, payload } 
};

export const IncreaseItem = ( payload: string ) => { 
    return { type: ActionTypes.INCREASE, payload } // Product ID
};

export const DecreaseItem = ( payload: string ) => { 
    return { type: ActionTypes.DECREASE, payload } // Product ID
};

export const RemoveItem = ( payload: string ) => { 
    return { type: ActionTypes.REMOVE, payload } // Product ID
};