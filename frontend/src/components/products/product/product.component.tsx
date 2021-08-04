import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from "./product.component.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarComponent from '../../../shared/star/star.component';
import { Link } from 'react-router-dom';

const ProductComponent = ( props: any ) => {
    const thumbnail = props.product && props.product.thumbnail || null;
    const variants = props.product && props.product.variants || null;
    const description = props.product && props.product.description || null;
    // Need name for product, because all variants will have the same name.
    // Need currency for product.
    // Need base price for product as *from.
    // Need rate calculated onto a product property.
    // Need review id and all reviews for that to show how many reviews came in for each product.
    const productRate = 3.5;

    console.log(props)
    return <>
                <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" className={styles.card_image} src={thumbnail} />
                    <Card.Body>
                        <Card.Title className="my-1">{ variants && variants[0] && variants[0].name }</Card.Title>
                        <Card.Text className="my-1">From £{ variants && variants[0] && variants[0].price }</Card.Text>
                        <Card.Text className="text-muted my-1">{ description }</Card.Text>
                        
                        <Card.Text className="mt-1">
                            <StarComponent rating={productRate} spacing={".1rem"} size={"1x"} />
                        </Card.Text>
                        
                        <Link to="/product/1">
                            <Button variant="action-blue">Check out</Button>
                        </Link>
                    </Card.Body>
                </Card>
           </>
}

export default ProductComponent;