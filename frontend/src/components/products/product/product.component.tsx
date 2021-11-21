import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from "./product.component.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarComponent from '../../../shared/star/star.component';
import { Link } from 'react-router-dom';

const ProductComponent = ( props: any ) => {
    const thumbnail = props.product && props.product.thumbnail || null;
    const variants = props.product && props.product.variants || null;
    const name = props.product.name || null;
    const description = props.product && props.product.description || null;
    const productRate = props.product && props.product.rate || 0;
    const reviewsLength = props.product && props.product.reviews.length || 0;

    return <>
                <Card style={{ width: '13.9rem' }} className={styles.card}>
                    <Card.Img variant="top" className={styles.card_image} src={thumbnail} />
                    <Card.Body className={styles.card_body}>
                        <Card.Title className="my-1">{ name }</Card.Title>
                        <Card.Text className="my-1">From £{ variants && variants[0] && variants[0].price }</Card.Text>
                        <Card.Text className={`text-muted my-1 ${styles.description}`}>{ description.substring(0, 50) }...</Card.Text>
                        
                        <Card.Text className="mt-2 d-flex align-items-center">
                            <StarComponent rating={productRate} spacing={".1rem"} size={"sm"} />
                            <span className="ml-2">({ reviewsLength })</span>
                        </Card.Text>
                        
                        <Link to={`/product/${props.product._id}`}>
                            <Button variant="light">Let me see</Button>
                        </Link>
                    </Card.Body>
                </Card>
           </>
}

export default ProductComponent;