import styles from "./basket.component.module.scss";
import Button from 'react-bootstrap/Button';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import * as BasketActions from "../../store/actions/basket.action";
import { Dispatch } from 'redux';
import { getBasket, getBasketTotal, State } from "../../store/index";
import { BasketProduct, State as Basket } from "../../models/basket.model";
import BasketItemComponent from './basket-item/basket-item.component';

const BasketComponent: React.FC<Props> = ( props: Props ): JSX.Element => {
    const basket: Basket = useSelector(( state: State ) => getBasket(state));
    const total: number = useSelector(( state: State ) => getBasketTotal(state));
    
    const onHandleNumberChange = (productIndex: string, productQuantity: number, value: number) => {
        const action = value > productQuantity ? "Increase" : value < productQuantity ? "Decrease" : null;
        switch ( action ) {
            case "Increase": return props.increaseBasketItem(productIndex);
            case "Decrease": return props.decreaseBasketItem(productIndex);
        }
    }

    return <>
                <h1>Your cart has { basket.products.length } items</h1>

                { basket.products.map((product: BasketProduct, index: number) => (
                    <BasketItemComponent key={`basket-item-${index}`} product={product} handleNumberChange={onHandleNumberChange}/>
                )) }
                
                <div className={styles.basket__total}>
                    <div>BASKET: { basket.products.length } Item</div>
                    <div>Total: £{ total }</div>
                </div>

                <Button>Checkout Now</Button>
                <Button>Back to Shop</Button>

                You may also like
           </>
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
    return {
      increaseBasketItem: (basketID: string) => dispatch(BasketActions.IncreaseItem(basketID)),
      decreaseBasketItem: (basketID: string) => dispatch(BasketActions.DecreaseItem(basketID)),
      removeBasketItem: (basketID: string) => dispatch(BasketActions.RemoveItem(basketID))
    }
}
  
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(BasketComponent);