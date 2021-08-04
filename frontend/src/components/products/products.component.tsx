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

    useEffect(() => {
        getProducts({}).then((response: any) => {
            console.log(response)
            setProducts(response.products);
        })
    }, [])

    const handleUpdate = (products: Product[]) => {
        setProducts(products);
    }

    return <>
                <div>Collections -&gt; <strong>Phones</strong></div>

                <h1>Phones</h1>

                <div>Filter - Sort</div>

                <FilterComponent handleUpdate={handleUpdate} />

                { products && (
                    <div className={styles.container}>
                        { products.map((product: Product) => (
                            <div className={styles.product}>
                                <ProductComponent />
                            </div>
                        )) }
                    </div>
                ) }
           </>
}

export default ProductsComponent;