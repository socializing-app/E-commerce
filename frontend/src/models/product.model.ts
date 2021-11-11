export interface State {
    products: Product[];
}

export const initialState = {
    products: []
}

export const initialProduct = {
    _id: "",
    active: true,
    brand: "",
    name: "",
    category: "",
    condition: "",
    description: "",
    discounts: [],
    manufacturer: "",
    model: "",
    reviews: [],
    subCategory: "",
    tags: [],
    thumbnail: "",
    variants: [],
    related: [],
    createdAt: new Date(),
    updatedAt: new Date()
}

export interface Product {
    _id: string;
    active: boolean;
    name: string;
    brand: string;
    category: string;
    condition: string;
    description: string;
    discounts: ProductDiscount[];
    manufacturer: string;
    model: string;
    reviews: ProductReview[];
    related: Product[];
    subCategory: string;
    tags: string[];
    thumbnail: string;
    variants: ProductVariant[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductVariant {
    _id: string;
    price: number;
    colour?: string;
    images?: string[];
    name?: string;
}

export const initialProductVariant = {
    _id: "",
    price: 0,
    colour: "",
    images: [],
    name: ""
}

export interface ProductBrand {}
export interface ProductCategory {}
export interface ProductDiscount {}
export interface ProductReview {}