import styles from "./menu-categories.component.module.scss";
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { Category } from "../../../models/category.model";
import { getCategories } from '../../../services/products.service';
import { useEffect, useState } from "react";

const MenuCategoriesComponent = ( props: any ) => {
    const [ categories, setCategories ] = useState([] as Category[]);

    useEffect(() => {
        getCategories().then((response: any) => {
            setCategories(response.categories);
        })
    }, [])

    return <>
                { categories.map((category: Category, index: number) => (
                    <Link to={{ pathname: '/products', category: category } as any} className={styles.link} key={`category-item-${index}`}>
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