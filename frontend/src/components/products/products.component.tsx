import ProductComponent from './product/product.component';
import styles from "./products.component.module.scss";
import { Link, useHistory } from "react-router-dom";
import FilterComponent from './filter/filter.component';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services/products.service';
import { Product } from '../../models/product.model';
import ScaleLoader from "react-spinners/ScaleLoader";
import { LoadingColour, LoadingStyles } from '../../config/settings.config';
import FormsComponent from "../../shared/forms/forms.component";
import useWindowWidth from '../../services/windowSize.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let filterOptionsConfig = [
    {
      name: "name",
      placeholder: "Product name",
      value: "",
      options: [],
      type: "textbox",
      width: "12"
    },
    {
      name: "rate",
      placeholder: "Rate (greater than or equal to)",
      label: "Rate (greater than or equal to)",
      value: "",
      type: "number",
      options: [],
      width: "12"
    },
    {
      name: "condition",
      placeholder: "Condition",
      label: ["New", "Used"],
      value: [false, false],
      type: "radio",
      options: ["new", "used"],
      width: "12"
    },
    {
      name: "minprice",
      placeholder: "Min Price",
      label: "Min Price",
      value: "",
      type: "number",
      options: [],
      width: "6"
    },
    {
      name: "maxprice",
      placeholder: "Max Price",
      label: "Max Price",
      value: "",
      type: "number",
      options: [],
      width: "6"
    }
  ]

const ProductsComponent = ( props: any ) => {
    const history = useHistory();
    const [ products, setProducts ] = useState(([] as Product[]));
    const [ loading, setLoading ] = useState(true);
    const windowWidth = useWindowWidth();
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

    const loadProducts = (filterOptions: any, category: any) => {
        setLoading(true);
        getProducts(filterOptions, category).then((response: any) => {
            setProducts(response.products);
            setLoading(false);
        })
    }

    return <div className={styles.products}>

                { windowWidth < 992 ? (
                    <div className={`${styles.filterbuttons}`}>
                        <FilterComponent handleUpdate={handleUpdate} category={category} /> 
                    </div>
                ): (
                    <div className={`${styles.filterContainer}`}>
                        <div className="row p-3">
                            <h4 className="p-3">Filters</h4>
                            <FormsComponent fields={filterOptionsConfig} onSave={(form: any) => loadProducts(form, category)} />
                        </div>
                    </div>
                ) }

                { loading ? <ScaleLoader loading={loading} css={LoadingStyles} color={LoadingColour} /> : (
                    <>
                        { products && products.length ? (
                            <>
                                <div className={`${styles.category}`}>Chillies</div>
                                <div className={`${styles.alertinfo}`}>The chili pepper (also chile, chile pepper, chilli pepper, or chilli[3]), from Nahuatl chīlli (Nahuatl pronunciation: [ˈt͡ʃiːlːi] (About this soundlisten)), is the berry-fruit of plants from the genus Capsicum which are members of the nightshade family, Solanaceae.[4] Chili peppers are widely used in many cuisines as a spice to add pungent 'heat' to dishes. Capsaicin and related compounds known as capsaicinoids are the substances giving chili peppers their intensity when ingested or applied topically. Although this definition would technically include bell peppers, in common language they are often two discrete categories: bell peppers and chili peppers. <span>That's Handy <FontAwesomeIcon icon={['fas', "pepper-hot"]} style={{fontSize: "1.2rem", color: "rgb(147, 29, 27)"}} /></span></div>
                                <div className={`${styles.showing} text-muted`}>Showing { products.length } of { products.length } Chillies</div>

                                <div className={styles.container}>
                                    { products.map((product: Product, index: number) => (
                                        <div className={styles.product} key={`product-item-${index}`}>
                                            <ProductComponent product={product} />
                                        </div>
                                    )) }
                                </div>
                            </>
                        ) : <div>Nothing to show you mate.</div> }
                    </>
                ) }
           </div>
}

export default ProductsComponent;