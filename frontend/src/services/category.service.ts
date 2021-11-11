import { Category } from "../models/category.model";
import * as http from "./http.service";

export const addCategory = (form: any): any => {
    console.log(form)
    return http.post("/api/v1/category/new", form);
}

export const getCategories = (): Promise<unknown> => {
    return http.get("/api/v1/category/all");
}