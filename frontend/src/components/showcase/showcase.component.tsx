import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./showcase.component.module.scss";

const ShowcaseComponent = ( props: any ) => {
    return <>
                <ListGroup className={styles.list}>
                    <ListGroup.Item className={styles.item}>
                        <div className={styles.icon_container}>
                            <FontAwesomeIcon icon={["fas", "shield-alt"]} className={styles.icon} />
                        </div>

                        <div className={styles.menuelement}>
                            <div className={styles.main}>We Produce. You Enjoy.</div>
                            <p className={styles.sub}>Never missed an order. We truly amaze our eaters with our quality and delivery time.</p>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.item}>
                        <div className={styles.icon_container}>
                            <FontAwesomeIcon icon={["fas", "chart-bar"]} className={styles.icon} />
                        </div>

                        <div className={styles.menuelement}>
                            <div className={styles.main}>Like It Fast</div>
                            <p className={styles.sub}>You order any time. And the super factory produces your great stuff.</p>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.item}>
                        <div className={styles.icon_container}>
                            <FontAwesomeIcon icon={["fas", "hand-holding-usd"]} className={styles.icon} />
                        </div>

                        <div className={styles.menuelement}>
                            <div className={styles.main}>Affordable Chillies</div>
                            <p className={styles.sub}>Hey. There is a massive range of chillies from the lowest prices you can think of.</p>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
           </>
}

export default ShowcaseComponent;