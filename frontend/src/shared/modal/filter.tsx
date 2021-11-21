import React from "react";
import Modal from 'react-bootstrap/Modal';
import FormsComponent from "../forms/forms.component";
import { getProducts } from '../../services/products.service';

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
    name: "rate",
    placeholder: "Rate (greater than or equal to)",
    label: "Rate (greater than or equal to)",
    value: "",
    type: "number",
    options: [],
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
    const { size, title, category, onSubmit } = props;

    const loadProducts = (filterOptions: any, category: any) => {
      getProducts(filterOptions, category).then((response: any) => {
        onSubmit(response.products);
      })
    }

    return (
      <Modal {...props} size={size} aria-labelledby="contained-modal-title-vcenter" centered>
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            { title }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <FormsComponent fields={filterOptionsConfig} onSave={(form: any) => loadProducts(form, category)} />
          </div>
        </Modal.Body>

      </Modal>
    );
}

export default FilterModalComponent;