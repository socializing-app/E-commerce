import { MouseEvent } from "react";

export const modalSize: "lg" | "sm" | "xl" | undefined = "lg";

export interface Modal {
    show?: boolean;
    title: string;
    bodytext: string;
    size?: typeof modalSize;
    closetext?: string;
    submittext?: string;
    onHide?: (event: MouseEvent) => void;
    onSubmit?: (event: MouseEvent) => void
}