import DropdownComponent from "./fields/dropdown/dropdown.component";
import RadioComponent from "./fields/radio/radio.component";
import SelectComponent from "./fields/select/select.component";
import TextBoxComponent from "./fields/textbox/textbox.component";
import NumberComponent from "./fields/number/number.component";
import ImageChooserComponent from "./fields/chooser/image.component";
import ColorChooserComponent from "./fields/chooser/color.component";
import { useState } from "react";
import { updateSelectionField, updateTextField, updateSubForm } from "../../services/form.service";
import TextAreaComponent from "./fields/textarea/textarea.component";
import SubFormComponent from "./fields/subform/subform.component";
import Button from 'react-bootstrap/Button';
import styles from "./forms.component.module.scss";

const FormsComponent = (props: any) => {
    const [ form, setForm ] = useState(props.fields);

    const handleChange = (value: any, index: number, fieldType: string, optionIndex: number = -1) => {
        let updatedform = null;

        if ( fieldType === "selection" ) updatedform = updateSelectionField(form, value, index, optionIndex);
        if ( fieldType === "textbox" ) updatedform = updateTextField(form, value, index);
        if ( fieldType === "number" ) updatedform = updateTextField(form, value, index);
        if ( fieldType === "dropdown" ) updatedform = updateTextField(form, value, index);
        if ( fieldType === "imagechooser" ) updatedform = updateTextField(form, value, index);
        if ( fieldType === "colorchooser" ) updatedform = updateTextField(form, value.hex, index);
        if ( fieldType === "subform" ) updatedform = updateSubForm(form, value, index, optionIndex);

        if ( !props.onSave ) props.onChange(updatedform)
        
        setForm(updatedform);
    }
    
    return (
        <>
            { form.map((option: any, index: number) => {
                return <div className={`col-${option.width} mb-3`} key={`form-field-${index}`}>
                            { option.type === 'dropdown' && <DropdownComponent field={option} handleChange={handleChange} index={index} /> }
                            { option.type === 'textbox' && <TextBoxComponent field={option} handleChange={handleChange} index={index} /> }
                            { option.type === 'select' && <SelectComponent field={option} handleChange={handleChange} index={index} /> }
                            { option.type === 'radio' && <RadioComponent field={option} handleChange={handleChange} index={index} /> }
                            { option.type === 'number' && <NumberComponent field={option} handleChange={handleChange} index={index} /> }
                            { option.type === 'textarea' && <TextAreaComponent field={option} handleChange={handleChange} index={index} /> }
                            { option.type === 'imagechooser' && <ImageChooserComponent field={option} handleChange={handleChange} index={index} /> }
                            { option.type === 'colorchooser' && <ColorChooserComponent field={option} handleChange={handleChange} index={index} /> }
                            { option.type === 'subform' && <SubFormComponent field={option} handleChange={handleChange} index={index} /> }
                       </div>
            }) }

            { props.onSave && (
                <div className={styles.buttonContainer}>
                    <Button variant="red" type="button" onClick={() => props.onSave(form)}>Save</Button>
                </div>
            ) }
        </>
    )

}

export default FormsComponent;