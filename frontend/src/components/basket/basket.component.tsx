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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BasketComponent: React.FC<Props> = ( props: Props ): JSX.Element => {
    const basket: Basket = useSelector(( state: State ) => getBasket(state));
    const total: number = useSelector(( state: State ) => getBasketTotal(state));
    const [ relatedProducts, setRelatedProducts ] = useState([] as Product[]);
    console.log(basket);
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
                <div className={`container ${styles.container}`}>
                    <div className={styles.basket}>
                        <div className={styles.title_container}>
                            <div className={styles.title}>MY BAG</div>
                            <div className={styles.reserved}>Items are reserved for 60 minutes</div>
                        </div>
                        
                        { basket.products.map((product: BasketProduct, index: number) => (
                            <BasketItemComponent key={`basket-item-${index}`} className={styles.basket_item} product={product} handleNumberChange={onHandleNumberChange} removeBasketItem={props.removeBasketItem} />
                        )) }

                        <div className={styles.basket__total}>
                            <div className={styles.subtitle}>SUB-TOTAL</div>
                            <div className={styles.subtitle}>£{ total }.00</div>
                        </div>

                        <div className={styles.panel}>
                            <div><FontAwesomeIcon icon={['fas', 'truck']} className={styles.panel_icon}/></div>
                            <div className={styles.main}>
                                <div className={styles.panel_title}>FREE* STANDARD DELIVERY</div>
                                <div className={styles.desc}>Faster delivery options available to most countries.</div>
                            </div>
                        </div>

                        <div className={styles.panel}>
                            <div><FontAwesomeIcon icon={['fas', 'undo']} className={styles.panel_icon}/></div>
                            <div className={styles.main}>
                                <div className={styles.panel_title}>EASY RETURNS</div>
                                <div className={styles.desc}>Send it back within 28 days of receiving your order.</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.checkout}>
                        <div className={styles.total}>TOTAL</div>

                        <div>
                            <div className={styles.line}>
                                <div className={styles.subtitle}>Sub-total</div>
                                <div>£{ total }.00</div>
                            </div>

                            <div className={styles.line}>
                                <div className={styles.subtitle}>Delivery</div>
                                <div><FontAwesomeIcon icon={['fas', 'truck']}/></div>
                            </div>

                            <div className={styles.delivery}>Standard Delivery (Free)</div>
                        </div>

                        <button className={styles.checkout_button} disabled={basket.products.length === 0}>CHECKOUT</button>

                        <div className={styles.subtitle}>WE ACCEPT:</div>
                        <div className={styles.cards}>
                            <FontAwesomeIcon icon={['fab', 'cc-visa']} className={styles.icon} />
                            <FontAwesomeIcon icon={['fab', 'cc-mastercard']} className={styles.icon} />
                            <FontAwesomeIcon icon={['fab', 'cc-paypal']} className={styles.icon} />
                        </div>
                        <div className={styles.discount}>Got a discount code? Add it in the next step.</div>
                    </div>
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