import styles from "./product-view.component.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import CarouselComponent from "../../../../shared/carousel/carousel.component";
import { getCarouselItems, initialCarousel } from '../../../../models/carousel.model';
import NumberInputComponent from "../../../../shared/number-input/number-input.component";
import { getProduct, getProductReviews } from '../../../../services/products.service';
import { useEffect, useState } from 'react';
import { initialProductVariant, initialProduct, Product, ProductVariant } from "../../../../models/product.model";
import ProductComponent from "../product.component";
import { Dispatch } from 'redux';
import { NotificationMessage } from '../../../../models/notification.model';
import * as NotificationActions from "../../../../store/actions/notification.action";
import * as BasketActions from "../../../../store/actions/basket.action";
import { connect, useSelector } from 'react-redux';
import { BasketProduct } from '../../../../models/basket.model';
import { getBasketProduct, State } from "../../../../store/index";
import ReviewsComponent from "../../../reviews/reviews.component";
import StarComponent from '../../../../shared/star/star.component';
import { useLocation } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { LoadingColour, LoadingStyles, CarouselLoadingStyles } from "../../../../config/settings.config";
import { Review } from "../../../../models/review.model";

const ProductViewComponent = ( props: any ) => {
    const location = useLocation();
    console.log(location)
    const productID = location.pathname ? location.pathname.split("/")[2] : "";
    const productRate = 3.5;
    const [ product, setProduct ] = useState(initialProduct);
    const [ reviews, setReviews ] = useState([] as Review[]);
    const [ activeVariant, setActiveVariant ] = useState(initialProductVariant);
    const [ loading, setLoading ] = useState(true);
    const [ carouselLoading, setCarouselLoading ] = useState(true);

    const currentBasket = useSelector(( state: State ) => getBasketProduct(state, activeVariant._id));

    console.log(currentBasket)

    let carouselImages: string[] = activeVariant && activeVariant.images ? activeVariant.images : [];

    const handleNumberChange = (value: number) => {
        const currentQuantity: number = currentBasket?.quantity || 0;
        const action = value > currentQuantity ? "Increase" : value < currentQuantity ? "Decrease" : null;
        switch ( action ) {
            case "Increase": {
                if ( currentQuantity === 0 ) return props.addBasketItem({ ...activeVariant, productID: product._id, name: product.name });
                else return props.increaseBasketItem(currentBasket?._id);
            }
            case "Decrease": {
                if ( currentQuantity === 1 ) return props.removeBasketItem(currentBasket?._id);
                else return props.decreaseBasketItem(currentBasket?._id);
            }
        }
    }

    useEffect(() => {
        getProduct(productID).then((product: any) => {
            console.log(product)
            setProduct(product);
            setActiveVariant(product.variants[0]);
            setLoading(false);
            setCarouselLoading(false);
        });

        getProductReviews(productID).then((reviews: Review[]) => setReviews(reviews));
    }, [])

    useEffect(() => { 
        carouselImages = activeVariant && activeVariant.images ? activeVariant.images : []
     }, [activeVariant])

    const handleChangeVariant = (index: number) => {
        setCarouselLoading(true);
        setActiveVariant(product.variants[index]);
        setTimeout(() => setCarouselLoading(false), 500);
    }
    
    return (
        <>
            { loading ? <ScaleLoader loading={loading} css={LoadingStyles} color={LoadingColour} /> : (
                <div className={`${styles.container}`}>

                    <div className={styles.subcontainer}>
                        <div className={styles.carouselContainer}>
                            { carouselLoading ? <ScaleLoader loading={carouselLoading} css={CarouselLoadingStyles} color={LoadingColour} /> : (
                                <CarouselComponent items={getCarouselItems(carouselImages)} />
                            ) }
                        </div>
                        
                        <div className={styles.details_container}>
                            <div className={styles.name}>{ product.name }</div>
                            <div className={styles.instock}>Currently in Stock</div>
                            <div className={styles.price}>£{ activeVariant.price }</div>

                            <div className={styles.reviews}>
                                <StarComponent rating={productRate} spacing={".1rem"} size={"1x"} />
                                <div className={styles.reviews_number}>(52 Reviews)</div>
                            </div>

                            <div className={styles.colour_container}>
                                <div className={styles.colour}>Colour</div>

                                <div className={styles.variant_container}>
                                    { product.variants.map((variant: ProductVariant, index: number) => (
                                        <div key={`product-variant-${index}`} 
                                            onClick={() => handleChangeVariant(index)} 
                                            style={{ backgroundColor: variant.colour }}
                                            className={`${styles.variant_colour} ${variant._id === activeVariant._id ? styles.activevariant : ""}`}></div>
                                    )) }
                                </div>
                            </div>

                            <NumberInputComponent className={styles.number} min={0} max={10} currentQuantity={currentBasket?.quantity || 0} onNumberChange={(value: number) => handleNumberChange(value)} />
    
                            <div className={styles.pricing}>
                                <Button variant="dark" disabled={currentBasket?.quantity !== undefined && currentBasket?.quantity > 0} onClick={() => props.addBasketItem({ ...activeVariant, productID: product._id, name: product.name })}>Add to basket</Button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.panel}>
                        <div className={styles.title}>Product Details</div>

                        <div className={styles.table_container}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Information</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Model</td>
                                        <td>{ product.model }</td>
                                    </tr>
                                    <tr>
                                        <td>Manufacturer</td>
                                        <td>{ product.manufacturer }</td>
                                    </tr>
                                    <tr>
                                        <td>Condition</td>
                                        <td>{ product.condition }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={styles.panel}>
                        <div className={styles.title}>Description</div>

                        <div className={styles.product__details}>{ product.description }</div>
                    </div>

                    <div className={styles.panel}>
                        <div className={styles.title}>Related Products</div>

                        <div className={styles.product__related}>
                            { product.related.map((product: Product, index: number) => (
                                <div className={styles.product} key={`related-product-${index}`}>
                                    <ProductComponent product={product} />
                                </div>
                            )) }
                        </div>
                    </div>

                    { reviews.length && (
                        <div className={styles.panel}>
                            <div className={styles.title}>Reviews</div>

                            <ReviewsComponent reviews={reviews} />
                        </div> 
                    ) }
                </div>
            ) }
        </> 
    )
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
    return {
      sendNotification: (notification: NotificationMessage) => dispatch(NotificationActions.displayMessage(notification)),
      addBasketItem: (item: BasketProduct) => dispatch(BasketActions.AddItem(item)),
      increaseBasketItem: (basketID: string) => dispatch(BasketActions.IncreaseItem(basketID)),
      decreaseBasketItem: (basketID: string) => dispatch(BasketActions.DecreaseItem(basketID)),
      removeBasketItem: (basketID: string) => dispatch(BasketActions.RemoveItem(basketID))
    }
}

export default connect(null, mapDispatchToProps)(ProductViewComponent);