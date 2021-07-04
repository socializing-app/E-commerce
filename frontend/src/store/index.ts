import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import thunk from "redux-thunk";
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from "reselect";

import { State as NotificationState, initialState as NotificationInitialState } from "../models/notification.model";

import * as fromNotifications from './reducers/notification.reducer';

const rootPersistConfig = { key: "root", storage: storage }
const notificationPersistConfig = { key: "notification", storage: storage }

const rootReducer = combineReducers({
    notification: persistReducer(notificationPersistConfig, fromNotifications.reducer)
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
}

export const initialState: State = {
    notification: NotificationInitialState
}

export const getNotificationState = (state: State) => state.notification;

export const getNotifications = createSelector(getNotificationState, fromNotifications.getNotifications);