import { validation, validators } from "../config/validators.config";

export interface FormField {
    value: string;
    touched?: boolean;
    valid?: boolean;
    error?: string | null;
    validator?: ( value: string ) => string | null;
}

export const initialFormField: FormField = {
    value: "",
    touched: false,
    valid: false,
    error: null
}

export interface RegisterModel {
    firstName: FormField;
    lastName: FormField;
    email: FormField;
    password: FormField;
}

export const initialRegisterModel: RegisterModel = {
    firstName: { ...initialFormField, validator: validators.firstName },
    lastName: { ...initialFormField, validator: validators.lastName },
    email: { ...initialFormField, validator: validators.email },
    password: { ...initialFormField, validator: validators.password }
}

export interface LoginModel {
    email: FormField;
    password: FormField;
}

export const initialLoginModel: LoginModel = {
    email: { ...initialFormField, validator: validation.required },
    password: { ...initialFormField, validator: validation.required }
}