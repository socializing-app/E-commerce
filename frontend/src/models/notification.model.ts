export interface State {
    messages: NotificationMessage[]
}

export interface NotificationMessage {
    id?: number;
    title?: string;
    message?: string;
    success?: boolean;
    error?: boolean;
    timestamp?: string;
    systemNotification?: boolean;
}

export const initialState: State = {
    messages: []
};