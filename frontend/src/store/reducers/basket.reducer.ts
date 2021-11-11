import { ActionWithPayload } from "..";
import { State, initialState, BasketProduct } from "../../models/basket.model";
import { ActionTypes as basketAction } from '../actions/basket.action';
import * as methods from "./methods/basket.methods";

export const reducer = (state: State = initialState, action: ActionWithPayload): State => {
    switch( action.type ) {
      case basketAction.ADD: return methods.addOrUpdateProduct(state, action);
      case basketAction.INCREASE: return methods.updateProduct(state, action.payload, true);
      case basketAction.DECREASE: return methods.updateProduct(state, action.payload, false);
      case basketAction.REMOVE: return methods.removeProduct(state, action.payload);
      default: return state;
    }
}

export const getBasket = (state: State) => state;
export const getProduct = (state: State, variantID: string) => state.products.find((product: BasketProduct) => variantID === product._id) || null;
export const getTotal = (state: State) => {
  return state.products.reduce(( total: number, current: BasketProduct ) => {
    return total += ( current.quantity || 0 ) * current.price;
  }, 0);
}