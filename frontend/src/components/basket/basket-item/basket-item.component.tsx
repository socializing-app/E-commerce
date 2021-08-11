import { Link } from "react-router-dom";
import NumberInputComponent from "../../../shared/number-input/number-input.component";
import styles from "./basket-item.component.module.scss";

const BasketItemComponent: React.FC<any> = ( props: any ): JSX.Element => {
    const { product, handleNumberChange } = props;

    return  <div className={styles.product}>
                        <Link to={`product/${product.productID}`} className={`${styles.product__image} ${styles.link}`}>
                            <img src={product.images[0]} />
                        </Link>

                        <div className={styles.product__details}>
                            <Link to={`product/${product.productID}`} className={styles.link}>
                                <strong>{ product.name }</strong>
                            </Link>
                            <div>Price: £{ product.price }</div>
                            <div>Color: { product.colour }</div>

                            <div className="my-2">
                                <NumberInputComponent min={0} max={10} currentQuantity={product.quantity || 0} onNumberChange={(value: number) => handleNumberChange(product._id, product.quantity || 0, value)} />
                            </div>

                            <a onClick={() => props.removeBasketItem(product._id)} className={styles.product__delete}>Delete from cart</a>
                        </div>
            </div>
}

export default BasketItemComponent;