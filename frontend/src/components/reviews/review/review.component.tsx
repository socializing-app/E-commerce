import styles from "./review.component.module.scss";
import StarComponent from '../../../shared/star/star.component';
import { Review } from '../../../models/review.model';

const ReviewComponent: React.FC<Review> = ( props: Review ): JSX.Element => {
    const username: string = props.user ? props.user.firstName + " " + props.user.lastName : "No User Info";

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.header__image}>
                    <img src="http://placeimg.com/480/480" alt=""/>
                </div>

                <div className={styles.header__info}>
                    <div className={styles.header__info_name}>{ username }</div>
                    <div className={styles.header__info_title}>Regular Buyer</div>
                    <div className={styles.header__info_location}>London, UK</div>
                </div>
            </div>

            <div className={styles.rating}>
                <div className={styles.rating__name}>Excellent</div>
                <StarComponent rating={props.productRate} spacing={".1rem"} size={"1x"} />
            </div>

            <hr/>

            <div className={styles.review}>
                { props.text }
            </div>
        </div>
    )
}

export default ReviewComponent;