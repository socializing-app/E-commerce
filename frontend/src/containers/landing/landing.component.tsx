import FeaturedComponent from '../../components/featured/featured.component';
import FeaturedReviewsComponent from '../../components/reviews/featured-reviews/featured-reviews.component';
import OffersComponent from '../../components/offers/offers.component';
import ShowcaseComponent from '../../components/showcase/showcase.component';
import ClubComponent from '../../components/club/club.component';
import { initialCarousel } from '../../models/carousel.model';
import CarouselComponent from '../../shared/carousel/carousel.component';
import styles from "./landing.component.module.scss";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const LandingComponent = ( props: any ) => {
    return <>
                    <CarouselComponent {...initialCarousel} />

                    <div className={styles.hero}>
                        <Link to="/products" className={styles.link}>
                            <Button variant="orange" className={styles.button}>Shop Now</Button>
                        </Link>
                    </div>

                    <FeaturedComponent />

                    <div className={styles.reviews}>
                        <div className={`${styles.title} ${styles.light}`}>Our Products</div>
                        <div className={`${styles.subtitle} ${styles.light}`}>Reviewed and assessed by our customers</div>

                        <div className={styles.reviews__review}>
                            <FeaturedReviewsComponent />
                        </div>
                    </div>
                    
                    <div>
                        <div className={`${styles.title} ${styles.dark}`}>Our Friendly Offers</div>

                        <OffersComponent />
                    </div>

                    <div className={styles.showcase}>
                        <div className={`${styles.title} ${styles.light}`}>Why we think we are great</div>
                        
                        <ShowcaseComponent />

                        <Link to="/products" className={styles.link}>
                            <Button variant="orange" className={styles.button}>Shop Now</Button>
                        </Link>
                    </div>
                    
                    <div>
                        <div className={`${styles.title} ${styles.dark}`}>Our Club</div>

                        <ClubComponent />
                    </div>
           </>
}

export default LandingComponent;