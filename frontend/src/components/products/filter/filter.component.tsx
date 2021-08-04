import { useState } from "react";
import { Product } from "../../../models/product.model";
import { filterModal, simpleModal } from "../../../services/modal.service";
import FilterModalComponent from "../../../shared/modal/filter";
import styles from "./filter.component.module.scss";

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
                FilterComponent

                <button onClick={() => setShow(true)}>open</button>
                
                { filterModal(show, "title", "bodytext", onClose, (products: Product[]) => onSubmit(products)) }
           </>
}

export default FilterComponent;