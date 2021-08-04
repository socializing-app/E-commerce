import ProductComponent from './product/product.component';
import styles from "./products.component.module.scss";
import { useHistory } from "react-router-dom";
import FilterComponent from './filter/filter.component';

const ProductsComponent = ( props: any ) => {
    const history = useHistory();
    console.log(history)
    return <>
                <div>Collections -&gt; <strong>Phones</strong></div>

                <h1>Phones</h1>

                <div>Filter - Sort</div>

                <FilterComponent />

                <div className={styles.container}>
                    <div className={styles.product}>
                        <ProductComponent />
                    </div>
                    <div className={styles.product}>
                        <ProductComponent />
                    </div>
                    <div className={styles.product}>
                        <ProductComponent />
                    </div>
                    <div className={styles.product}>
                        <ProductComponent />
                    </div>
                    <div className={styles.product}>
                        <ProductComponent />
                    </div>
                    <div className={styles.product}>
                        <ProductComponent />
                    </div>
                    <div className={styles.product}>
                        <ProductComponent />
                    </div>
                </div>
           </>
}

export default ProductsComponent;