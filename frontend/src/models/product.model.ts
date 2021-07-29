export interface State {
    products: Product[];
}

export const initialState = {
    products: []
}

export const initialProduct = {
    active: true,
    brand: "",
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
    createdAt: new Date(),
    updatedAt: new Date()
}

export interface Product {
    active: boolean;
    brand: string;
    category: string;
    condition: string;
    description: string;
    discounts: ProductDiscount[];
    manufacturer: string;
    model: string;
    reviews: ProductReview[];
    subCategory: string;
    tags: string[];
    thumbnail: string;
    variants: ProductVariant[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductVariant {
    _id: string;
    name: string;
    price: number;
    colour?: string;
    images?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export const initialProductVariant = {
    _id: "",
    name: "",
    price: 0,
    colour: "",
    images: [],
    createdAt: new Date(),
    updatedAt: new Date()
}

export interface ProductBrand {}
export interface ProductCategory {}
export interface ProductDiscount {}
export interface ProductReview {}

export interface serverProduct {
    product: Product;
    reviews: ProductReview[];
    relatedProducts: Product[];
}

export const initialServerProduct = {
    product: initialProduct,
    reviews: [],
    relatedProducts: []
}