import styles from "./basket.component.module.scss";
import Button from 'react-bootstrap/Button';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import * as BasketActions from "../../store/actions/basket.action";
import { Dispatch } from 'redux';
import { getBasket, getBasketTotal, State } from "../../store/index";
import { BasketProduct, State as Basket } from "../../models/basket.model";
import BasketItemComponent from './basket-item/basket-item.component';
import { useEffect, useState } from "react";
import { Product } from "../../models/product.model";
import { getProducts } from "../../services/products.service";
import ProductComponent from "../../components/products/product/product.component";

const BasketComponent: React.FC<Props> = ( props: Props ): JSX.Element => {
    const basket: Basket = useSelector(( state: State ) => getBasket(state));
    const total: number = useSelector(( state: State ) => getBasketTotal(state));
    const [ relatedProducts, setRelatedProducts ] = useState([] as Product[]);
    
    const onHandleNumberChange = (productIndex: string, productQuantity: number, value: number) => {
        const action = value > productQuantity ? "Increase" : value < productQuantity ? "Decrease" : null;
        switch ( action ) {
            case "Increase": return props.increaseBasketItem(productIndex);
            case "Decrease": return props.decreaseBasketItem(productIndex);
        }
    }

    useEffect(() => {
        getProducts({}).then((response: any) => setRelatedProducts(response.products));
    }, []);

    return <>
                <div className={styles.title}>Your cart has { basket.products.length } items</div>

                { basket.products.map((product: BasketProduct, index: number) => (
                    <BasketItemComponent key={`basket-item-${index}`} product={product} handleNumberChange={onHandleNumberChange} removeBasketItem={props.removeBasketItem} />
                )) }
                
                <div className={styles.basket__total}>
                    <div>BASKET: { basket.products.length } Items</div>
                    <div>Total: £{ total }</div>
                </div>

                <div className={styles.buttons}>
                    <Button variant="orange" className={styles.button}>Checkout Now</Button>
                    <Button variant="action-blue" className={styles.button}>Back to Shop</Button>
                </div>

                <div className={styles.title}>You may also like</div>

                {/* Here there could be a call to an endpoint that returns related products
                    Based on the basket content.
                    For now just display a few random products
                */}

                <div className={styles.basket__related}>   
                    { relatedProducts.slice(0,4).map((product: Product, index: number) => (
                        <div className={styles.product} key={`related-product-${index}`}>
                            <ProductComponent product={product} />
                        </div>
                    )) }
                </div>
           </>
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
    return {
      increaseBasketItem: (productID: string) => dispatch(BasketActions.IncreaseItem(productID)),
      decreaseBasketItem: (productID: string) => dispatch(BasketActions.DecreaseItem(productID)),
      removeBasketItem: (productID: string) => dispatch(BasketActions.RemoveItem(productID))
    }
}
  
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(BasketComponent);