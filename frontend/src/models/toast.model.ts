export interface Toaster {
    dismissTime: number;
    title?: string;
    message?: string;
    width?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    animated?: boolean;
    icon?: string;
    color?: string;
    background?: string;
}

export const initialToaster = {
    dismissTime: 3000,
    animated: true,
    width: "500px",
    top: 10,
    right: 10,
    title: "Example",
    message: "Example message"
}