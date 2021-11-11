import { useState } from "react";
import FormsComponent from "../../../shared/forms/forms.component";
import { addProduct } from "../../../services/products.service";
import { process } from "../../../services/form.service";
import Button from 'react-bootstrap/Button';
import styles from "./new.component.module.scss";














// need a way to select image here so maybe reuse the image uploader component.
// set dropdown options from here once the config arrived from the db.
// need a textarea field as well.
// product might exist already, so you can add a variant to it.

// thumbnail, manufacturer, model, description, condition, active, tags
// category, subcategory, brand, maybe discounts?
// name
// colour, price
// images ( different from thumbnail )

// 1. Form type -> image chooser
// 2. Set HandleChange methods on the Form component
// 3. Form type -> Text area
// 4. Do something with product choosing






// add another 





let filterOptions = [
    {
      name: "name",
      placeholder: "Name",
      value: "",
      options: [],
      type: "textbox",
      width: "12"
    },
    {
      name: "description",
      placeholder: "Description",
      value: "",
      options: [],
      type: "textarea",
      width: "12"
    },
    {
      name: "thumbnail",
      placeholder: "Thumbnail image",
      value: [],
      options: [],
      type: "imagechooser",
      width: "12"
    },
    {
      name: "baseprice",
      placeholder: "Base Price",
      label: "Base Price",
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
      name: "category",
      placeholder: "Category",
      value: "",
      type: "dropdown",
      options: [],
      width: "12"
    },
    {
      name: "manufacturer",
      placeholder: "Manufacturer",
      value: "",
      type: "textbox",
      options: [],
      width: "12"
    },
    {
      name: "model",
      placeholder: "Model",
      value: "",
      type: "textbox",
      options: [],
      width: "12"
    },
    {
      name: "variants",
      placeholder: "Variants",
      value: [],
      type: "subform",
      maxSubforms: 4,
      width: "12",
      options: [
        [
          {
            name: "images",
            placeholder: "Images",
            value: [],
            options: [4],
            type: "imagechooser",
            width: "12"
          },
          {
            name: "colour",
            placeholder: "Colour",
            value: "",
            type: "colorchooser",
            options: [],
            width: "12"
          },
          {
            name: "price",
            placeholder: "Price",
            label: "Price",
            value: "",
            type: "number",
            options: [],
            width: "12"
          }
        ]
      ]
    }
  ]

const NewProductComponent = ( props: any ) => {
  return (
        <>   
          <FormsComponent fields={filterOptions} onSave={(form: any) => addProduct(process(form))} />
        </>
  )
}

export default NewProductComponent;