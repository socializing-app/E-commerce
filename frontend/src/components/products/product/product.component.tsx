import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from "./product.component.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductComponent = ( props: any ) => {
    return <>
                <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" className={styles.card_image} src="https://e-commerce-bucket-images.s3.eu-west-2.amazonaws.com/phone+1.png" />
                    <Card.Body>
                        <Card.Title className="my-1">Huawei P20</Card.Title>
                        <Card.Text className="my-1">$329</Card.Text>
                        <Card.Text className="text-muted my-1">Some quick example text to build on the card.</Card.Text>
                        
                        <Card.Text className="mt-1">
                            <FontAwesomeIcon icon={['fas', 'star']} className={styles.star} />
                            <FontAwesomeIcon icon={['fas', 'star']} className={styles.star} />
                            <FontAwesomeIcon icon={['fas', 'star']} className={styles.star} />
                            <FontAwesomeIcon icon={['fas', 'star']} className={styles.star} />
                            <FontAwesomeIcon icon={['far', 'star']} className={styles.star} />
                        </Card.Text>
                        
                        <Button variant="action-blue">Check out</Button>
                    </Card.Body>
                </Card>
           </>
}

export default ProductComponent;