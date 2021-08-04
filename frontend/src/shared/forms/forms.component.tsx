import DropdownComponent from "./fields/dropdown/dropdown.component";
import RadioComponent from "./fields/radio/radio.component";
import SelectComponent from "./fields/select/select.component";
import TextBoxComponent from "./fields/textbox/textbox.component";
import NumberComponent from "./fields/number/number.component";

const FormsComponent = (props: any) => {
    const { field, handleChange, index } = props;

    return (
        <>
            { field.type === 'dropdown' && <DropdownComponent field={field} handleChange={handleChange} index={index} /> }
            { field.type === 'textbox' && <TextBoxComponent field={field} handleChange={handleChange} index={index} /> }
            { field.type === 'select' && <SelectComponent field={field} handleChange={handleChange} index={index} /> }
            { field.type === 'radio' && <RadioComponent field={field} handleChange={handleChange} index={index} /> }
            { field.type === 'number' && <NumberComponent field={field} handleChange={handleChange} index={index} /> }
        </>
    )

}

export default FormsComponent;