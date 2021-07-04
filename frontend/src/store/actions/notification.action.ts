import { NotificationMessage } from "../../models/notification.model";

export const ActionTypes = {
    DISPLAY: "[Notification] Display message"
}

export const displayMessage = ( payload: NotificationMessage ) => { 
    return { type: ActionTypes.DISPLAY, payload } 
};