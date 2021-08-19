import { ActionWithPayload } from "../..";
import { User as State, initialUser as initialState } from "../../../models/user.model";

export const loginUser = (state: State, action: ActionWithPayload) => {
    if ( state.accessToken ) return state;

    return { ...state, ...action.payload };
}

export const logoutUser = (state: State) => {
    return { ...initialState };
}

export const updateUser = (state: State, action: ActionWithPayload) => {
    return { ...state, ...action.payload };
}