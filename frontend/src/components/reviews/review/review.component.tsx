import styles from "./review.component.module.scss";
import StarComponent from '../../../shared/star/star.component';
import { Review } from '../../../models/review.model';

const ReviewComponent: React.FC<Review> = ( props: Review ): JSX.Element => {
    const username: string = props.user ? props.user.firstName + " " + props.user.lastName : "No User Info";
    const profileImagePath: string = props.user && props.user.profileImagePath !== "avatar.jpg" ? props.user.profileImagePath : "http://placeimg.com/480/480";

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.header__image}>
                    <img src={profileImagePath} alt=""/>
                </div>

                <div className={styles.header__info}>
                    <div className={styles.header__info_name}>{ username }</div>
                    <StarComponent rating={props.productRate} spacing={".1rem"} size={"1x"} />
                </div>
            </div>

            <div className={styles.review}>
                { props.text }
            </div>
        </div>
    )
}

export default ReviewComponent;