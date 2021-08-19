import { User } from "../../models/user.model";

export const ActionTypes = {
    LOGIN: "[User] Log in user",
    LOGOUT: "[User] Log out user",
    UPDATE: "[User] Update user"
}

export const loginUser = ( payload: User ) => { 
    return { type: ActionTypes.LOGIN, payload } 
};

export const logoutUser = () => { 
    return { type: ActionTypes.LOGOUT } 
};

export const updateUser = ( payload: User ) => { 
    return { type: ActionTypes.UPDATE, payload } 
};