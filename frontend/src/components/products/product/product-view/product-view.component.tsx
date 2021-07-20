import Container from 'react-bootstrap/Container';
import styles from "./product-view.component.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import CarouselComponent from "../../../../shared/carousel/carousel.component";
import { initialCarousel } from '../../../../models/carousel.model';

const ProductViewComponent = ( props: any ) => {
    return <>
                <div>Collections -&gt; Phones -&gt; <strong>Huawei P20</strong></div>

                <h1>Huawei P20</h1> 

                <FontAwesomeIcon icon={['fas', 'star']} className={styles.star} />
                <FontAwesomeIcon icon={['fas', 'star']} className={styles.star} />
                <FontAwesomeIcon icon={['fas', 'star']} className={styles.star} />
                <FontAwesomeIcon icon={['fas', 'star']} className={styles.star} />
                <FontAwesomeIcon icon={['far', 'star']} className={styles.star} />

                <div>52 Reviews</div>

                <CarouselComponent { ...initialCarousel } />

                <h1>Price <strong>$299</strong></h1>

                <Button>-</Button>
                <input type="number" placeholder="0" />
                <Button>+</Button>

                <Button>Add to basket</Button>

                <h1>Product Details</h1>

                <div>Model: Huawei</div>
                <div>Model: Huawei</div>
                <div>Model: Huawei</div>
                <div>Model: Huawei</div>
                <div>Model: Huawei</div>

                <h1>Description</h1>

                <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>

                Related Products

                Reviews

           </>
}

export default ProductViewComponent;