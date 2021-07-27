import styles from "./menu-categories.component.module.scss";
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { Category } from "../../../models/category.model";

const categories: Category[] = [
    {
        id: "1",
        name: "Clothes"
    },
    {
        id: "2",
        name: "Electronics"
    },
    {
        id: "3",
        name: "Bakery"
    },
    {
        id: "4",
        name: "Cosmetics"
    },
    {
        id: "5",
        name: "Animals"
    },
    {
        id: "6",
        name: "Drinks"
    }
]

const MenuCategoriesComponent = ( props: any ) => {
    return <>
                { categories.map((category: Category, index: number) => (
                    <Link to={{ pathname: '/products', category: category.name } as any} className={styles.link} key={`category-item-${index}`}>
                        <ListGroup.Item className={styles.listItem}>
                            <span className={styles.listItem__span}>
                                <FontAwesomeIcon icon={['fas', "check-circle"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                                <span>{ category.name }</span>
                            </span>
                            <FontAwesomeIcon icon={['fas', "arrow-right"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                        </ListGroup.Item>
                    </Link>
                )) }
           </>
}

export default MenuCategoriesComponent;