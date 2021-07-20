import { ActionWithPayload } from "../index";
import { State, initialState, NotificationMessage } from "../../models/notification.model";
import { ActionTypes as notificationAction } from '../actions/notification.action';

export const reducer = (state: State = initialState, action: ActionWithPayload): State => {
  switch( action.type ) {
    case notificationAction.DISPLAY: {
      return createNotification(state, action);
    }
    case notificationAction.DISMISS: {
      return removeNotification(state, action);
    }
    default: return state;
  }
}

export const getNotifications = (state: State) => state.messages;

const removeNotification = (state: State, action: ActionWithPayload): State => {
  if ( !action.payload ) return state;

  const updatedMessages = state.messages.filter((message: NotificationMessage) => message.id !== action.payload);

  return {
    messages: updatedMessages
  }
}

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
        id: generateUniqueID(),
        timestamp: new Date().toISOString()
      }
    ]
  }
}

const generateUniqueID = (length = 30) => {
  let code: string = '';
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for ( let i = 0; i < length; i++ ) {
      const index = Math.floor(Math.random() * characters.length);
      code += characters.charAt(index);
  }

  return code;
} 