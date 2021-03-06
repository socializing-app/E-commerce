import { Category } from "../models/category.model";
import { Review } from "../models/review.model";
import * as http from "./http.service";

export const getProduct = ( id: string ): Promise<unknown> => {
    return http.get(`/api/v1/products/${id}`);
}

export const getProducts = (options: any, category?: Category): Promise<unknown> => {
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

    if ( category ) {
        query += "category=" + category._id + "&";
    }
 
    if ( query ) {
        query = "?" + query.substring(0, query.length - 1);
    }
console.log(query);
    return http.get(`/api/v1/products${query}`);
}

export const addProduct = (form: any): any => {
    console.log(form)
    return http.post("/api/v1/products/new", form);
}

export const getCategories = (): Promise<unknown> => {
    return http.get("/api/v1/products/category/all");
}

export const getAllReviews = (): Promise<Review[] | any> => {
    return http.get("/api/v1/reviews/all");
}

export const getFeaturedReviews = (): Promise<Review[] | any> => {
    return http.get("/api/v1/reviews/featured");
}

export const getProductReviews = (id: string): Promise<Review[] | any> => {
    return http.get(`/api/v1/reviews/product/${id}`);
}