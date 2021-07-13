import Roles from "../config/roles.config";

export interface Routes {
    component: any;
    path: string;
    title?: string;
    exact?: boolean;
    permission?: Roles[];
    children?: Routes[];
}