export interface User {
    address: any[]
    createdAt: string;
    discounts: any[]
    email: string;
    firstName: string;
    lastName: string;
    orders: any[];
    ordreReview: any[];
    permissions: any[];
    productReviews: any[];
    profileImagePath: string;
    tokenVersion: number;
    updatedAt: string;
    _id: string;
}

export const initialUser: User = {
    address: [],
    createdAt: "",
    discounts: [],
    email: "",
    firstName: "",
    lastName: "",
    orders: [],
    ordreReview: [],
    permissions: [],
    productReviews: [],
    profileImagePath: "",
    tokenVersion: 0,
    updatedAt: "",
    _id: ""
}