import Button from 'react-bootstrap/Button';
import styles from "./club.component.module.scss";

const ClubComponent = ( props: any ) => {
    return <>
                <div className={styles.image}>
                    <img src="http://placeimg.com/640/480" alt="Offer image"/>
                </div>

                <div className={styles.main}>
                    Our loyalty programme lets you earn points and enjoy rewards.
                </div>

                <div className={styles.sub}>
                    The Club is free to join, and we love treating our members.
                </div>

                <Button variant="orange" className={styles.button}>Join Club</Button>
           </>
}

export default ClubComponent;