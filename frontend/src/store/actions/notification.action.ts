import { NotificationMessage } from "../../models/notification.model";

export const ActionTypes = {
    DISPLAY: "[Notification] Display message",
    DISMISS: "[Notification] Dismiss message"
}

export const displayMessage = ( payload: NotificationMessage ) => { 
    return { type: ActionTypes.DISPLAY, payload } 
};

export const dismissMessage = ( payload: string ) => { 
    return { type: ActionTypes.DISMISS, payload } 
};