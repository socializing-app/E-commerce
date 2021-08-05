import ProductComponent from './product/product.component';
import styles from "./products.component.module.scss";
import { useHistory } from "react-router-dom";
import FilterComponent from './filter/filter.component';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services/products.service';
import { Product } from '../../models/product.model';

const ProductsComponent = ( props: any ) => {
    const history = useHistory();
    const [ products, setProducts ] = useState(([] as Product[]));
    console.log(history)
    const category = (history.location as any).category || null;

    useEffect(() => {
        getProducts({}, category).then((response: any) => {
            console.log(response)
            setProducts(response.products);
        })
    }, [])

    const handleUpdate = (products: Product[]) => {
        setProducts(products);
    }

    return <>
                { category && <div>Collections -&gt; <strong>{ category.name }</strong></div> }

                { category && <h1>{ category.name }</h1> }

                <FilterComponent handleUpdate={handleUpdate} category={category} />

                { products && products.length ? (
                    <div className={styles.container}>
                        { products.map((product: Product, index: number) => (
                            <div className={styles.product} key={`product-item-${index}`}>
                                <ProductComponent product={product} />
                            </div>
                        )) }
                    </div>
                ) : <div>Nothing to show you mate.</div> }
           </>
}

export default ProductsComponent;