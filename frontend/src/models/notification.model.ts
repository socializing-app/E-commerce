export interface State {
    messages: NotificationMessage[]
}

export interface NotificationMessage {
    id: string;
    title?: string;
    message?: string;
    type: string;
    timestamp?: string;
    systemNotification?: boolean;
}

export const initialState: State = {
    messages: []
};