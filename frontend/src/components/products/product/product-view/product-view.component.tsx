import styles from "./product-view.component.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import CarouselComponent from "../../../../shared/carousel/carousel.component";
import { getCarouselItems, initialCarousel } from '../../../../models/carousel.model';
import NumberInputComponent from "../../../../shared/number-input/number-input.component";
import { getProduct } from '../../../../services/products.service';
import { useEffect, useState } from 'react';
import { initialProductVariant, initialServerProduct, Product, ProductVariant } from "../../../../models/product.model";
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

const ProductViewComponent = ( props: any ) => {
    const location = useLocation();
    console.log(location)
    const productID = location.pathname ? location.pathname.split("/")[2] : "";
    const productRate = 3.5;
    const [ serverProduct, setProduct ] = useState(initialServerProduct);
    const [ activeVariant, setActiveVariant ] = useState(initialProductVariant);
    const currentBasket = useSelector(( state: State ) => getBasketProduct(state, activeVariant._id));

    const { product, reviews, relatedProducts } = serverProduct;
    let carouselImages: string[] = activeVariant && activeVariant.images ? activeVariant.images : [];

    const handleNumberChange = (value: number) => {
        const currentQuantity: number = currentBasket?.quantity || 0;
        const action = value > currentQuantity ? "Increase" : value < currentQuantity ? "Decrease" : null;
        switch ( action ) {
            case "Increase": {
                if ( currentQuantity === 0 ) return props.addBasketItem(activeVariant);
                else return props.increaseBasketItem(currentBasket?._id);
            }
            case "Decrease": {
                if ( currentQuantity === 1 ) return props.removeBasketItem(currentBasket?._id);
                else return props.decreaseBasketItem(currentBasket?._id);
            }
        }
    }

    useEffect(() => {
        getProduct(productID).then((response: any) => {
            console.log(response)
            setProduct(response);
            setActiveVariant(response.product.variants[0]);
        })
    }, [])

    useEffect(() => { 
        carouselImages = activeVariant && activeVariant.images ? activeVariant.images : []
     }, [activeVariant])

    const handleChangeVariant = (index: number) => {
        setActiveVariant(product.variants[index]);
    }
    
    return (
        <>
            <div>Collections -&gt; Phones -&gt; <strong>{ activeVariant.name }</strong></div>

            <div className={styles.title_container}>
                <div className={styles.title}>{ activeVariant.name }</div>

                <StarComponent rating={productRate} spacing={".1rem"} size={"1x"} />

                <div>52 Reviews</div>
            </div>

            { activeVariant._id && <CarouselComponent { ...initialCarousel } items={getCarouselItems(carouselImages)} /> }

            <div className={styles.pricing}>
                <div className={styles.title}>Price: <strong className={styles.title__highlight}>£{ activeVariant.price }</strong></div>
                <NumberInputComponent className={styles.number} min={0} max={10} currentQuantity={currentBasket?.quantity || 0} onNumberChange={(value: number) => handleNumberChange(value)} />
            </div>

            <div className={styles.variant__container}>
                { product.variants.map((variant: ProductVariant, index: number) => (
                    <div key={`product-variant-${index}`} 
                        onClick={() => handleChangeVariant(index)} 
                        style={{ backgroundColor: variant.colour }}
                        className={styles.variant__colour}></div>
                )) }
            </div>

            <Button variant="orange" onClick={() => props.addBasketItem(activeVariant)}>Add to basket</Button>

            <div className={styles.title}>Product Details</div>

            <div className={styles.product__details}>
                <div>Model: { product.model }</div>
                <div>Brand: { product.brand }</div>
                <div>Manufacturer: { product.manufacturer }</div>
                <div>Condition: { product.condition }</div>
                <div>Category: { product.category }</div>
            </div>

            <div className={styles.title}>Description</div>

            <div className={styles.product__details}>{ product.description }</div>

            <div className={styles.title}>Related Products</div>

            <div className={styles.product__related}>
                { relatedProducts.map((product: Product, index: number) => (
                    <div className={styles.product} key={`related-product-${index}`}>
                        <ProductComponent product={product} />
                    </div>
                )) }
            </div>

            <div className={styles.title}>Reviews</div>

            <ReviewsComponent reviews={reviews} />
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