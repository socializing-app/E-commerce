import * as http from "./http.service";

export const update = ( payload: any ): Promise<unknown> => {
    console.log(payload)
    return http.put("/api/v1/users/update", payload);
}