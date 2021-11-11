import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import styles from "./dropdown.component.module.scss";
import { getConfig } from "../../../../services/config.service";
import { getCategories } from '../../../../services/category.service';

const DropdownComponent = (props: any) => {
    const { field, handleChange, index } = props;

    useEffect(() => {
        if ( field.name === "category" ) {
            getCategories().then((categories: any) => {
                field.options = categories.map((category: any) => category.name);

                handleChange("", -1, "dropdown");
            })
        } else {
            getConfig().then((response: any) => {
                // if ( field.name === "manufacturer" ) field.options = response.manufacturers;
                // if ( field.name === "model" ) field.options = response.models;
                if ( field.name === "colour" ) field.options = response.colours;

                handleChange("", -1, "dropdown");
            })
        }
    }, [])

    return (
        <>
            <div className="mb-2">{ field.placeholder }</div>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className={styles.dropdown_toggle}>{ field.value || field.name }</Dropdown.Toggle>

                <Dropdown.Menu style={{width: "100%"}}>
                    { field.options.map((optionItem: string, i: number) => (
                        <Dropdown.Item key={`dropdown-item-${optionItem}-${i}`} 
                                        active={optionItem === field.value}
                                        onSelect={(eventKey: any, event: any) => handleChange(event.target.text, index, "dropdown")}>
                                        { optionItem }
                        </Dropdown.Item>
                    )) }
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default DropdownComponent;