import { useState } from "react";
import FormsComponent from "../../../../shared/forms/forms.component";
import styles from "./subform.component.module.scss";
import Button from 'react-bootstrap/Button';

const SubFormComponent = (props: any) => {
    const { field, handleChange, index } = props;
    const [ form, setForm ] = useState(field.options);

    const emptySubForm = (): any => {
        const emptyForm: any[] = [];

        field.options[0].forEach((f: any) => {
            emptyForm.push({ ...f, value: f.type === "imagechooser" ? [] : "" });
        })

        return emptyForm;
    }

    const increaseSubForms = () => {
        if ( field.options.length < field.maxSubforms ) {
            const subForms = [ ...field.options, emptySubForm() ];

            handleChange(subForms, index, "subform");
            setForm(subForms);
        }
    }

    const handleChangeSubForm = (fields: any, index: number, type: string, subIndex: number) => {
        console.log(fields, index)
        const updatedForm = form.map((field: any, i: number) => ( i === subIndex ) ? fields : field );
console.log(updatedForm)
        handleChange(updatedForm, index, type);
        setForm(updatedForm);
    }

    return (
        <>
            <div>{ field.placeholder }</div>
        
            <div className={styles.container}>
                { field.options.map((subform: any, subIndex: number) => (
                    <div key={`subForm-${subIndex}`} className={styles.subform}>
                        <FormsComponent fields={subform} onChange={(fields: any) => handleChangeSubForm(fields, index, "subform", subIndex)} />
                    </div>
                )) }
            </div>

            { ( field.options.length !== field.maxSubforms ) && <Button variant="dark" type="button" onClick={() => increaseSubForms()}>Add more { field.placeholder }</Button> }
        </>
    )
}

export default SubFormComponent;