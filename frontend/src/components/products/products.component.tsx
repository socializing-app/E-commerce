import Container from 'react-bootstrap/Container';
import ProductComponent from './product/product.component';
import styles from "./products.component.module.scss";

const ProductsComponent = ( props: any ) => {
    return <>
                <div>Collections -&gt; <strong>Phones</strong></div>

                <h1>Phones</h1>

                <div>Filter - Sort</div>

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