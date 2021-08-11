import Button from 'react-bootstrap/Button';
import styles from "./club.component.module.scss";

const ClubComponent = ( props: any ) => {
    return <>
                <div className={styles.image}>
                    <img src="https://e-commerce-bucket-images.s3.eu-west-2.amazonaws.com/Screenshot+2021-06-19+at+08.20+1.png" alt="Offer image"/>
                </div>

                <div className={styles.main}>
                    Our loyalty programme lets you earn points and enjoy rewards.
                </div>

                <div className={styles.sub}>
                    The Club is free to join, and we love treating our members.
                </div>
           </>
}

export default ClubComponent;