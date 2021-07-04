import { apiPath } from "./constants.service";
import { Headers, initialHeaders } from "../models/http.model";
import axios from "axios";

export const get = ( url: string, 
                     headers: Headers = initialHeaders,
                     successCallback?: Function,
                     errorCallback?: Function ): Promise<unknown> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(apiPath + url, { headers });
            return resolve(successCallback ? successCallback(response.data) : response.data);
        } catch (error) {
            return reject(errorCallback ? errorCallback(error.response.data) : error.response.data);
        }
    })
}

export const post = ( url: string, 
                      data: any = {}, 
                      headers: Headers = initialHeaders,
                      successCallback?: Function,
                      errorCallback?: Function ): Promise<unknown> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(apiPath + url, data, { headers });
            return resolve(successCallback ? successCallback(response.data) : response.data);
        } catch (error) {
            return reject(errorCallback ? errorCallback(error.response.data) : error.response.data);
        }
    })
}

export const put = ( url: string, 
                     data: any = {}, 
                     headers: Headers = initialHeaders,
                     successCallback?: Function,
                     errorCallback?: Function ): Promise<unknown> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.put(apiPath + url, data, { headers });
            return resolve(successCallback ? successCallback(response.data) : response.data);
        } catch (error) {
            return reject(errorCallback ? errorCallback(error.response.data) : error.response.data);
        }
    })
}

export const destroy = ( url: string,
                         headers: Headers = initialHeaders,
                         successCallback?: Function,
                         errorCallback?: Function ): Promise<unknown> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(apiPath + url, { headers });
            return resolve(successCallback ? successCallback(response.data) : response.data);
        } catch (error) {
            return reject(errorCallback ? errorCallback(error.response.data) : error.response.data);
        }
    })
}