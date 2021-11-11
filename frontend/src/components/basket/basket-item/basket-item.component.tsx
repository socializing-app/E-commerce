import { Link } from "react-router-dom";
import NumberInputComponent from "../../../shared/number-input/number-input.component";
import styles from "./basket-item.component.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BasketItemComponent: React.FC<any> = ( props: any ): JSX.Element => {
    const { product, handleNumberChange } = props;

    return  <div className={styles.product}>
                <Link to={`product/${product.productID}`} className={`${styles.product__image} ${styles.link}`}>
                    <img src={product.images[0]} />
                </Link>

                <div className={styles.product__details}>
                    <div className={styles.price}> £{ product.price }.00 </div>
                    <div className={styles.name}> { product.name } </div>
                    
                    <div className={styles.meta}>
                        <div className={styles.colour} style={{ background: product.colour }}></div>

                        <div className={styles.quantity}>
                            <NumberInputComponent min={0} max={10} currentQuantity={product.quantity || 0} onNumberChange={(value: number) => handleNumberChange(product._id, product.quantity || 0, value)} />
                        </div>
                    </div>

                    <button className={styles.save}><FontAwesomeIcon icon={['far', 'heart']} className={styles.icon} /> Save for later</button>

                    <div onClick={() => props.removeBasketItem(product._id)} className={styles.delete}><FontAwesomeIcon icon={['fas', 'times']} /></div>
                </div>
            </div>
}

export default BasketItemComponent;