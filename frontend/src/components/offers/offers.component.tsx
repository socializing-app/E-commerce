import Button from 'react-bootstrap/Button';
import styles from "./offers.component.module.scss";

const OffersComponent = ( props: any ) => {
    return <div className={styles.container}>
                <div className={styles.image}>
                    <img src="https://e-commerce-bucket-images.s3.eu-west-2.amazonaws.com/Screenshot+2021-06-19+at+08.13+1.png" alt="Offer image"/>
                </div>

                <div className={styles.text_container}>
                    <div className={styles.main}>
                        Our recommendation scheme gives you the perfect opportunity to invite somebody here so we can offer the same services to them.
                    </div>

                    <div className={styles.sub}>
                        For your efforts, you get <span className={styles.highlight}>10% OFF</span> of your next order and your friend receives <span className={styles.highlight}>20% OFF</span> of their very first order.
                    </div>
                </div>
           </div>
}

export default OffersComponent;