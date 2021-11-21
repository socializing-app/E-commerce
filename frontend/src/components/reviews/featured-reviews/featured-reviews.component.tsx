import styles from "./featured-reviews.component.module.scss";
import { Review } from '../../../models/review.model';
import { useEffect, useState } from "react";
import { getFeaturedReviews } from "../../../services/products.service";
import ReviewComponent from "../review/review.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import useWindowWidth from '../../../services/windowSize.service';

const FeaturedReviewsComponent: React.FC<any> = ( props: any ): JSX.Element => {
    const [ reviews, setReviews ] = useState([] as Review[]);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        getFeaturedReviews().then((reviews: Review[]) => {
            setReviews([...reviews, ...reviews])
            console.log(reviews)
        });
    }, []);

    return (
        <>
            { windowWidth > 1400 ? (
                <div className={styles.reviews}>
                    { reviews.map((review: Review, index: number) => (
                        <>
                            { index % 2 == 0 ? (
                                <>
                                    <div key={`review-index-${index}`} className={`${styles.review} ${styles.review__left}`}>
                                        { index === 0 && <div className={styles.circle_top}></div> }
                                        <div className={styles.product}>{ review.user.firstName } was loving  
                                                <Link to={`/product/${review.product._id}`} className={styles.link}>
                                                    { review.product.name } <FontAwesomeIcon icon={['fas', "pepper-hot"]} className="mr-2" style={{fontSize: "1.2rem", color: "rgb(147, 29, 27)"}} />
                                                </Link> and writing good stuff about it
                                        </div>
                                        <ReviewComponent {...review} />
                                    </div>
                                    <div className={styles.review}></div>
                                </>
                            ): (
                                <>
                                    <div className={styles.review}>{ index === ( reviews.length - 1 ) && <div className={styles.circle_bottom}></div> }</div>
                                    <div key={`review-index-${index}`} className={`${styles.review} ${styles.review__right}`}>
                                        <div className={styles.product}>{ review.user.firstName } was loving  
                                                <Link to={`/product/${review.product._id}`} className={styles.link}>
                                                    { review.product.name } <FontAwesomeIcon icon={['fas', "pepper-hot"]} className="mr-2" style={{fontSize: "1.2rem", color: "rgb(147, 29, 27)"}} />
                                                </Link> and writing good stuff about it
                                        </div>
                                        <ReviewComponent {...review} />
                                    </div>
                                </>
                            ) }
                        </>
                    )) }
                </div>
            ) : (
                <>
                    { reviews.map((review: Review, index: number) => (
                        <div key={`review-index-${index}`} className="my-3">
                            <div className={styles.product}>{ review.user.firstName } was loving  
                                <Link to={`/product/${review.product._id}`} className={styles.link}>
                                    { review.product.name } <FontAwesomeIcon icon={['fas', "pepper-hot"]} className="mr-2" style={{fontSize: "1.2rem", color: "rgb(147, 29, 27)"}} />
                                </Link> and writing good stuff about it
                            </div>
                            <ReviewComponent {...review} />
                        </div>
                    )) }
                </>
            ) }
        </>
    )
}

export default FeaturedReviewsComponent;