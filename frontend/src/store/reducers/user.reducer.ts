import { ActionWithPayload } from "..";
import { User as State, initialUser as initialState } from "../../models/user.model";
import { ActionTypes as userAction } from '../actions/user.action';
import * as methods from "./methods/user.methods";

export const reducer = (state: State = initialState, action: ActionWithPayload): State => {
    switch( action.type ) {
      case userAction.LOGIN: return methods.loginUser(state, action);
      case userAction.LOGOUT: return methods.logoutUser(state);
      default: return state;
    }
}

export const getUser = (state: State) => state;
export const isAuthorised = (state: State) => !!state.accessToken;
export const getFullName = (state: State) => state.firstName + " " + state.lastName;
export const getProfileImagePath = (state: State) => state.profileImagePath;