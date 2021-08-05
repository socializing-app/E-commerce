import NumberInputComponent from "../../../shared/number-input/number-input.component";
import styles from "./basket-item.component.module.scss";

const BasketItemComponent: React.FC<any> = ( props: any ): JSX.Element => {
    const { product, handleNumberChange } = props;

    return  <div className={styles.product}>
                        <div className={styles.product__image}>
                            <img src={product.images[0]} />
                        </div>

                        <div className={styles.product__details}>
                            <div><strong>{ product.name }</strong></div>
                            <div>Price: £{ product.price }</div>
                            <div>Color: { product.colour }</div>

                            <NumberInputComponent min={0} max={10} currentQuantity={product.quantity || 0} onNumberChange={(value: number) => handleNumberChange(product._id, product.quantity || 0, value)} />

                            <a onClick={() => props.removeBasketItem(product._id)}>Delete from cart</a>
                        </div>
            </div>
}

export default BasketItemComponent;