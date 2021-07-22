import { ActionWithPayload } from "../..";
import { State, NotificationMessage } from "../../../models/notification.model";

export const removeNotification = (state: State, action: ActionWithPayload): State => {
    if ( !action.payload ) return state;
  
    const updatedMessages = state.messages.filter((message: NotificationMessage) => message.id !== action.payload);
  
    return {
      messages: updatedMessages
    }
  }
  
export const createNotification = (state: State, action: ActionWithPayload): State => {
    if ( action.payload.message === "" || action.payload.title === "" ) return state;
  
    return updateNotification(state, action.payload);
}
  
export const updateNotification = (state: State, newNotification: NotificationMessage): State => {
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
  
export const generateUniqueID = (length = 30) => {
    let code: string = '';
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for ( let i = 0; i < length; i++ ) {
        const index = Math.floor(Math.random() * characters.length);
        code += characters.charAt(index);
    }
  
    return code;
} 