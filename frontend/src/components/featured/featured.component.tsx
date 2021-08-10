import { useEffect, useState } from 'react';
import { Product } from '../../models/product.model';
import { getProducts } from '../../services/products.service';
import ProductComponent from '../products/product/product.component';
import styles from "./featured.component.module.scss";

const FeaturedComponent = ( props: any ) => {
    const [ products, setProducts ] = useState([] as Product[]);

    // Might use an algorithm to select the featured products
    // Or just use a setting from the Admin management
    // For now just display only 4 of all products.

    useEffect(() => {
        getProducts({}).then((response: any) => setProducts(response.products));
    }, [])

    return <>
                <h1>Our Featured Products</h1>

                <div className={styles.products}>
                    { products.slice(0, 4).map((product: Product, index: number) => (
                        <ProductComponent product={product} key={`featured-product-${index}`} />
                    )) }
                </div>
           </>
}

export default FeaturedComponent;