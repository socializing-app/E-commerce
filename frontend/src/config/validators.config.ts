export const validation = {
    required: ( value: string ) => !( value && value.length > 0 ) ? 'Required field.' : null,
    min: ( value: string, length: number ) => ( value.length < length && value.length > 0 ) ? "Too Short!" : null,
    max: ( value: string, length: number ) => ( value.length > length ) ? "Too Long!" : null,
    email: ( value: string ) => new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(value) ? null : "Invalid email!",
    hasLowercase: ( value: string ) => new RegExp(/[a-z]/).test(value) ? null : "Password must contain lowercase letters.",
    hasUppercase: ( value: string ) => new RegExp(/[A-Z]/).test(value) ? null : "Password must contain uppercase letters.",
    hasNumber: ( value: string ) => new RegExp(/[0-9]/).test(value) ? null : "Password must contain at least a number.",
    hasSpecial: ( value: string ) => new RegExp(/[!@#$%^&*(),.?":{}|<>]/).test(value) ? null : 'Password must contain at least a special character.',
}

export const validators = {
    firstName: ( value: string ) => validation.min(value, 2) || validation.max(value, 50) || validation.required(value),
    lastName: ( value: string ) => validation.min(value, 2) || validation.max(value, 50) || validation.required(value),
    email: ( value: string ) => validation.email(value),
    password: ( value: string ) => validation.hasLowercase(value) || validation.hasUppercase(value) || validation.hasNumber(value) || validation.hasSpecial(value) || validation.min(value, 8)
}