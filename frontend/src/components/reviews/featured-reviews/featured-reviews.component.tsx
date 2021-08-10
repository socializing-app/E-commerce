import styles from "./review.component.module.scss";
import StarComponent from '../../../shared/star/star.component';
import { Review } from '../../../models/review.model';
import { useEffect, useState } from "react";
import { getProductReviews } from "../../../services/products.service";
import ReviewComponent from "../review/review.component";

const FeaturedReviewsComponent: React.FC<any> = ( props: any ): JSX.Element => {
    const [ reviews, setReviews ] = useState([] as Review[]);

    // Would be best if we had a carousel of reviews?
    // Needs to be discussed
    // For now just display the first review of all reviews

    useEffect(() => {
        getProductReviews().then((reviews: Review[]) => {
            setReviews(reviews)
            console.log(reviews)
        });
    }, []);

    return (
        <>
           <ReviewComponent {...reviews[0]} />
        </>
    )
}

export default FeaturedReviewsComponent;