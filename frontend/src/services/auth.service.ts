import { Signin, Signup } from "../models/auth.model";
import * as http from "../services/http.service";

export const signup = ( payload: Signup ): Promise<unknown> => {
    return http.post("/api/v1/users/signup", payload);
}

export const signin = ( payload: Signin ): Promise<unknown> => {
    return http.post("/api/v1/users/login", payload);
}