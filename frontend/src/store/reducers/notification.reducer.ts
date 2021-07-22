import { ActionWithPayload } from "../index";
import { State, initialState } from "../../models/notification.model";
import { ActionTypes as notificationAction } from '../actions/notification.action';
import * as methods from "./methods/notifications.methods";

export const reducer = (state: State = initialState, action: ActionWithPayload): State => {
  switch( action.type ) {
    case notificationAction.DISPLAY: return methods.createNotification(state, action);
    case notificationAction.DISMISS: return methods.removeNotification(state, action);
    default: return state;
  }
}

export const getNotifications = (state: State) => state.messages;