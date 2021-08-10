import Button from 'react-bootstrap/Button';
import styles from "./offers.component.module.scss";

const OffersComponent = ( props: any ) => {
    return <>
                <div className={styles.image}>
                    <img src="http://placeimg.com/640/480" alt="Offer image"/>
                </div>

                <div className={styles.main}>
                    Our recommendation scheme gives you the perfect opportunity to invite somebody here so we can offer the same services to them.
                </div>

                <div className={styles.sub}>
                    For your efforts, you get <span className={styles.highlight}>10% OFF</span> of your next order and your friend receives <span className={styles.highlight}>20% OFF</span> of their very first order.
                </div>

                <Button variant="orange" className={styles.button}>Invite Friends</Button>
           </>
}

export default OffersComponent;