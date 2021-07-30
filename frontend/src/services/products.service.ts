import * as http from "./http.service";

export const getProduct = ( id: string ): Promise<unknown> => {
    return http.get(`/api/v1/products/${id}`);
}