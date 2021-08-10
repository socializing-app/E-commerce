import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./showcase.component.module.scss";

const ShowcaseComponent = ( props: any ) => {
    return <>
                <ListGroup className={styles.list}>
                    <ListGroup.Item className={styles.item}>
                        <FontAwesomeIcon size={'5x'} icon={["fas", "coffee"]} className={styles.icon} />

                        <div>
                            <div className={styles.main}>Reliability</div>
                            <p className={styles.sub}>There are more things to say here of course, because we are so fantastic. Honestly, I just don’t want to say anything more.</p>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.item}>
                        <FontAwesomeIcon size={'5x'} icon={["fas", "coffee"]} className={styles.icon} />

                        <div>
                            <div className={styles.main}>Performance</div>
                            <p className={styles.sub}>There are more things to say here of course, because we are so fantastic. Honestly, I just don’t want to say anything more.</p>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className={styles.item}>
                        <FontAwesomeIcon size={'5x'} icon={["fas", "coffee"]} className={styles.icon} />

                        <div>
                            <div className={styles.main}>Cheap Prices</div>
                            <p className={styles.sub}>There are more things to say here of course, because we are so fantastic. Honestly, I just don’t want to say anything more.</p>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
           </>
}

export default ShowcaseComponent;