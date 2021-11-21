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
                    <div className={styles.hero}>
                        <img src="https://e-commerce-bucket-images.s3.eu-west-2.amazonaws.com/thomas-m-evans-sBaGplnso94-unsplash.jpg" alt=""/>
                        <div className={styles.hero_action}>
                            <div className={styles.main_title}>Smoking hot?</div>
                            <div className={styles.inspiration}>Ready to Eat. <span>Order any time. Delivered to your door.</span></div>
                        </div>
                    </div>

                    <div className={styles.products}>
                        <div className={`${styles.title} ${styles.light}`}>Eaters Are Loving <span>These</span>.</div>
                        {/* <div className={styles.squares}><div></div><div></div><div></div><div></div><div></div></div> */}

                        <FeaturedComponent />

                        <Link to="/products" className={`${styles.link} ${styles.discover} my-5`}>
                            <Button variant="light" className={styles.button}>Discover More</Button>
                        </Link>
                    </div>

                    <div className={styles.reviews}>
                        <div className={`${styles.title} ${styles.light}`}>They <span>Ate</span> Chillies</div>

                        <div className={styles.reviews__review}>
                            <FeaturedReviewsComponent />
                        </div>
                    </div>
                    
                    <div className="bg-white py-5">
                        <div className={`${styles.title} ${styles.dark}`}>Friendly We Are. <span>Sometimes</span>.</div>

                        <OffersComponent />
                    </div>

                    <div className={`${styles.showcase}`}>
                        <div className={styles.showcase_image}>
                            <img src="https://e-commerce-bucket-images.s3.eu-west-2.amazonaws.com/albert-vincent-wu-N39zZ5wFR7c-unsplash.jpg" alt=""/>
                        </div>
                        
                        <div className={styles.showcase_details}>
                            <div className={`${styles.title} ${styles.tasty}`}>Spicy. But <span>Tasty</span>.</div>
                            
                            <ShowcaseComponent />

                            <Link to="/products" className={styles.link}>
                                <Button variant="red" className={styles.red_button}>Shop Now</Button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className={`${styles.ourclub} py-5`}>
                        <div className={`${styles.title} ${styles.dark}`}>Want To <span>Become</span> A Chilly Member?</div>

                        <ClubComponent />
                    </div>
           </>
}

export default LandingComponent;