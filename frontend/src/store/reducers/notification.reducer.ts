import { ActionWithPayload } from "../index";
import { State, initialState, NotificationMessage } from "../../models/notification.model";
import { ActionTypes as notificationAction } from '../actions/notification.action';

export const reducer = (state: State = initialState, action: ActionWithPayload): State => {
  switch( action.type ) {
    case notificationAction.DISPLAY: {
      return createNotification(state, action);
    }
    default: return state;
  }
}

export const getNotifications = (state: State) => state.messages;

const createNotification = (state: State, action: ActionWithPayload): State => {
  if ( action.payload.message === "" || action.payload.title === "" ) return state;

  return updateNotification(state, action.payload);
}

const updateNotification = (state: State, newNotification: NotificationMessage): State => {
  return {
    messages: [
      ...state.messages, 
      {
        ...newNotification,
        id: state.messages.length,
        timestamp: new Date().toISOString()
      }
    ]
  }
}