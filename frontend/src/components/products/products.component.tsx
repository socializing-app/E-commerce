import ProductComponent from './product/product.component';
import styles from "./products.component.module.scss";
import { Link, useHistory } from "react-router-dom";
import FilterComponent from './filter/filter.component';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services/products.service';
import { Product } from '../../models/product.model';
import ScaleLoader from "react-spinners/ScaleLoader";
import { LoadingColour, LoadingStyles } from '../../config/settings.config';

const ProductsComponent = ( props: any ) => {
    const history = useHistory();
    const [ products, setProducts ] = useState(([] as Product[]));
    const [ loading, setLoading ] = useState(true);
    console.log(history)
    const category = (history.location as any).category || null;

    useEffect(() => {
        getProducts({}, category).then((response: any) => {
            console.log(response)
            setProducts(response.products);
            setLoading(false);
        })
    }, [])

    const handleUpdate = (products: Product[]) => {
        setProducts(products);
    }

    return <div className={styles.products}>
                { category && <div><Link to="menu/categories">Categories</Link> -&gt; <strong className={styles.category_name}>{ category.name }</strong></div> }

                { category && <div className={styles.category_title}>{ category.name }</div> }

                <div className="mb-3">
                    <FilterComponent handleUpdate={handleUpdate} category={category} /> 
                </div>

                { loading ? <ScaleLoader loading={loading} css={LoadingStyles} color={LoadingColour} /> : (
                    <>
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
                ) }
           </div>
}

export default ProductsComponent;