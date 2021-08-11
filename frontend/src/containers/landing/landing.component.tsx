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
import { LandingCarousel } from '../../config/settings.config';

const LandingComponent = ( props: any ) => {
    return <>
                    <CarouselComponent {...LandingCarousel} />

                    <div className={styles.hero}>
                        <Link to="/products" className={styles.link}>
                            <Button variant="orange" className={styles.button}>Shop Now</Button>
                        </Link>
                    </div>

                    <div>
                        <div className={`${styles.title} ${styles.dark}`}>Our Featured Products</div>

                        <FeaturedComponent />

                        <Link to="/products" className={styles.link}>
                            <Button variant="orange" className={styles.button}>Discover More</Button>
                        </Link>
                    </div>

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

                        <Link to="/products" className={styles.link}>
                            <Button variant="orange" className={styles.button}>Invite Friends</Button>
                        </Link>
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

                        <Link to="/products" className={styles.link}>
                            <Button variant="orange" className={styles.button}>Join Club</Button>
                        </Link>
                    </div>
           </>
}

export default LandingComponent;