import { ActionWithPayload } from "..";
import { State, initialState } from "../../models/notification";
import * as notificationAction from '../actions/notification';

export const reducer = (state: State = initialState, action: ActionWithPayload): State => {
  switch( action.type ) {
    case notificationAction.ActionTypes.DISPLAY: {
      if ( !action.payload.message || action.payload.message === "" || !action.payload.title || action.payload.title === "" ) return state;

      const newState = {
        messages: [
          ...state.messages, 
          {
            ...action.payload,
            id: state.messages.length,
            timestamp: new Date().toISOString()
          }
        ]
      }

      return newState;
    }
    default: return state;
  }
}

export const getNotifications = (state: State) => state.messages;