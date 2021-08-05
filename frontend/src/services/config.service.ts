import * as http from "./http.service";

export const getConfig = (): Promise<unknown> => {
    return http.get("/api/v1/config");
}