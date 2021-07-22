import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import thunk from "redux-thunk";
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from "reselect";

import { State as NotificationState, initialState as NotificationInitialState } from "../models/notification.model";
import { State as BasketState, initialState as BasketInitialState } from "../models/basket.model";

import * as fromNotifications from './reducers/notification.reducer';
import * as fromBasket from './reducers/basket.reducer';

const rootPersistConfig = { key: "root", storage: storage }
const notificationPersistConfig = { key: "notification", storage: storage }
const basketPersistConfig = { key: "basket", storage: storage }

const rootReducer = combineReducers({
    notification: persistReducer(notificationPersistConfig, fromNotifications.reducer),
    basket: persistReducer(basketPersistConfig, fromBasket.reducer)
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const Store = () => {
    const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
    const persistor = persistStore(store);

    return { store, persistor };
};

export default Store;

export interface ActionWithPayload extends Action {
    payload?: any;
}

export interface State {
    notification: NotificationState;
    basket: BasketState;
}

export const initialState: State = {
    notification: NotificationInitialState,
    basket: BasketInitialState
}

export const getNotificationState = (state: State) => state.notification;
export const getBasketState = (state: State) => state.basket;

export const getNotifications = createSelector(getNotificationState, fromNotifications.getNotifications);

export const getBasket = createSelector(getBasketState, fromBasket.getBasket);
export const getBasketProduct = createSelector(getBasketState, (state: State, productID: string) => productID, fromBasket.getProduct);
export const getBasketTotal = createSelector(getBasketState, fromBasket.getTotal);