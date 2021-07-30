import { Review } from '../../models/review.model';
import ReviewComponent from './review/review.component';

interface Props {
    reviews: Review[];
}

const ReviewsComponent: React.FC<Props> = ( props: Props ) => {
    const { reviews } = props;

    return <>
                { reviews.map((review: Review, index: number) => (
                    <div className="mx-3 mb-3">
                        <ReviewComponent {...review} key={`review-${index}`} />
                    </div>
                )) }
           </>
}

export default ReviewsComponent;