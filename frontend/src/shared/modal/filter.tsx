import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Modal as ModalProps } from "../../models/modal.model";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown'
import FormsComponent from "../forms/forms.component";
import { getProducts } from '../../services/products.service';
import { getConfig } from "../../services/config.service";
import styles from "./filter.component.module.scss";

let filterOptionsConfig = [
  {
    name: "name",
    placeholder: "Product name",
    value: "",
    options: [],
    type: "textbox",
    width: "12"
  },
  {
    name: "manufacturer",
    placeholder: "Manufacturer",
    value: "",
    type: "dropdown",
    options: [],
    width: "12"
  },
  {
    name: "model",
    placeholder: "Models",
    value: "",
    type: "dropdown",
    options: [],
    width: "12"
  },
  {
    name: "colour",
    placeholder: "Colour",
    value: "",
    type: "dropdown",
    options: ["black", "green", "red"],
    width: "12"
  },
  {
    name: "condition",
    placeholder: "Condition",
    label: ["New", "Used"],
    value: [false, false],
    type: "radio",
    options: ["new", "used"],
    width: "12"
  },
  {
    name: "minprice",
    placeholder: "Min Price",
    label: "Min Price",
    value: "",
    type: "number",
    options: [],
    width: "6"
  },
  {
    name: "maxprice",
    placeholder: "Max Price",
    label: "Max Price",
    value: "",
    type: "number",
    options: [],
    width: "6"
  }
]

const FilterModalComponent = ( props: any ) => {
    const { size, title, bodytext, onHide, onSubmit, closetext, submittext } = props;
    const [ filterOptions, setFilterOptions ] = useState(filterOptionsConfig);
    const [ products, setProducts ] = useState(null);
    const [ length, setLength ] = useState(0);

    const updateSelection = (value: any, index: number, optionIndex: number) => {
      return filterOptions.map((option: any, i: number) => {
        if ( index === i ) {
          return { ...option, value: option.value.map((checked: boolean, optIndex: number) => {
            if ( optIndex === optionIndex ) return value;
            return ( filterOptions[index].type === "select" ) ? checked : false;
          }) }
        }
        return option;
      });
    }

    const updateValue = (value: any, index: number) => {
      return filterOptions.map((option: any, i: number) => {
        if ( index === i ) return { ...option, value }
        return option;
      })
    }
    
    const handleChange = (value: any, index: number, optionIndex: number = -1) => {
      let updatedFilterOptions = null;

      if ( optionIndex !== -1 ) {
        updatedFilterOptions = updateSelection(value, index, optionIndex);
      } else {
        updatedFilterOptions = updateValue(value, index);
      }

      console.log(updatedFilterOptions);
      setFilterOptions(updatedFilterOptions);
    }

    const handleClear = (index: number) => {
      setFilterOptions(filterOptions.map((option: any, i: number) => {
        if ( i === index ) {
          if ( option.type === "radio" || option.type === "select" ) {
            return {
              ...option,
              value: option.value.map((value: boolean) => false)
            }
          } else return {
            ...option,
            value: ""
          }
        }

        return option;
      }))
    }

    const hasValue = (option: any) => {
      if ( option.type === "radio" || option.type === "select" ) {
        return option.value.some((value: boolean) => value);
      } else return !!option.value;
    }

    useEffect(() => {
      getProducts(filterOptions).then((response: any) => {
          console.log(response)
          setProducts(response.products);
          setLength(response.length);
      })
    }, [filterOptions])

    useEffect(() => {
      getConfig().then((response: any) => {
          console.log(response)

          filterOptions[1].options = response.manufacturers;
          filterOptions[2].options = response.models;
          filterOptions[3].options = response.colours;
      })
    }, [])

    return (
      <Modal {...props} size={size} aria-labelledby="contained-modal-title-vcenter" centered>
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            { title }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            { filterOptions.map((option: any, index: number) => {
              return <div className={`col-${option.width} ${styles.field} my-1`} key={`form-field-${index}`}>
                        <FormsComponent field={option} handleChange={handleChange} index={index} />
                        { hasValue(option) && <div onClick={() => handleClear(index)} className={styles.field__escape}>RESET</div> }
                     </div>
            }) }
          </div>
          
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ onHide }>{ closetext }</Button>
          <Button onClick={ () => onSubmit(products) }>{ submittext } ({ length })</Button>
        </Modal.Footer>

      </Modal>
    );
}

export default FilterModalComponent;