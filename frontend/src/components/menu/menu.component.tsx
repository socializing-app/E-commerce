import styles from "./menu.component.module.scss";
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { menu } from "../../config/menu.config";

const MenuComponent = ( props: any ) => {
    return <>
                <ListGroup className={styles.list}>
                    { menu.map((element: any, index: number) => (
                        <Link to={element.link} className={styles.link} key={`menu-item-${index}`}>
                            <ListGroup.Item className={styles.listItem}>
                                <span>
                                    <FontAwesomeIcon icon={['fas', (element.icon) as IconName]} className="mr-2" style={{fontSize: "1.5rem"}} />
                                    <span>{ element.title }</span>
                                </span>
                                <FontAwesomeIcon icon={['fas', "arrow-right"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                            </ListGroup.Item>
                        </Link>
                    )) }
                </ListGroup>
           </>
}

export default MenuComponent;