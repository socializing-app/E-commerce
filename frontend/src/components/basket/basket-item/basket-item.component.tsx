import NumberInputComponent from "../../../shared/number-input/number-input.component";
import styles from "./basket-item.component.module.scss";

const BasketItemComponent: React.FC<any> = ( props: any ): JSX.Element => {
    const { product, handleNumberChange } = props;

    return  <div className={styles.product}>
                        <div className={styles.product__image}>
                            <img src="https://e-commerce-bucket-images.s3.eu-west-2.amazonaws.com/phone+1.png" />
                        </div>

                        <div className={styles.product__details}>
                            <div><strong>Huawei P20</strong></div>
                            <div>Price: $299</div>
                            <div>Color: Black</div>
                            <div>Serial number: 2342342323</div>

                            <NumberInputComponent min={0} max={10} currentQuantity={product.quantity || 0} onNumberChange={(value: number) => handleNumberChange(product._id, product.quantity || 0, value)} />

                            <a onClick={() => props.removeBasketItem(product._id)}>Delete from cart</a>
                        </div>
            </div>
}

export default BasketItemComponent;