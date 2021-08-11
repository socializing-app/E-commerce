import { useState } from "react";
import { Product } from "../../../models/product.model";
import { filterModal, simpleModal } from "../../../services/modal.service";
import FilterModalComponent from "../../../shared/modal/filter";
import styles from "./filter.component.module.scss";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterComponent = ( props: any ) => {
    const [ show, setShow ] = useState(false);

    const openModal = () => {
        return 
    }

    const onClose = (close: boolean) => {
        console.log("on close.", close)
        setShow(false)
    }

    const onSubmit = (products: Product[]) => {
        console.log("on submit.", products);
        props.handleUpdate(products);
        setShow(false);
    }

    return <>
                <div className={styles.buttons}>
                    <Button variant="orange" className={styles.button} onClick={() => setShow(true)}>
                        <FontAwesomeIcon icon={["fas", "filter"]} className={styles.icon} />
                        <span>Filter</span>
                    </Button>

                    {/* sorting the products, so is this gonna be a modal? I think it is */}
                    <Button variant="orange" className={styles.button} onClick={() => setShow(true)}>
                        <FontAwesomeIcon icon={["fas", "sort"]} className={styles.icon} />
                        <span>Sort</span>
                    </Button>
                </div>
                
                { filterModal(show, "Filter", props.category, onClose, (products: Product[]) => onSubmit(products)) }
           </>
}

export default FilterComponent;