import { User } from "./user.model";

export interface Review {
    _id: string;
    product: string;
    productRate: number;
    text: string;
    images: string[];
    video: string[];
    deliveryRate: number;
    experienceRate: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}