import { Signin, Signup } from "../models/auth.model";
import * as http from "./http.service";

export const signup = ( payload: Signup ): Promise<unknown> => {
    return http.post("/api/v1/users/signup", payload);
}

export const signin = ( payload: Signin, success: Function, error: Function ): Promise<unknown> => {
    return http.post("/api/v1/users/login", payload, {}, success, error);
}