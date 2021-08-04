import * as http from "./http.service";

export const getProduct = ( id: string ): Promise<unknown> => {
    return http.get(`/api/v1/products/${id}`);
}

export const getProducts = (options: any): Promise<unknown> => {
    let query = "";
    
    for ( let option in options ) {
        if ( options[option].value ) {
            if ( options[option].name === 'condition' ) {
                const values = options[option].value;
                const labels = options[option].options;

                const conditionIndex = values.findIndex((value: boolean) => value);

                if ( conditionIndex !== -1 ) {
                    query += options[option].name + "=" + labels[conditionIndex] + "&";
                }
            } else {
                query += options[option].name + "=" + options[option].value + "&";
            }
        }
    }

    if ( query ) {
        query = "?" + query.substring(0, query.length - 1);
    }

    return http.get(`/api/v1/products${query}`);
}