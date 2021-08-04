import { useState } from "react";
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

    const onSubmit = () => {
        console.log("on submit.")
    }

    return <>
                FilterComponent

                <button onClick={() => setShow(true)}>open</button>
                
                { filterModal(show, "title", "bodytext", onClose, () => onSubmit()) }
           </>
}

export default FilterComponent;