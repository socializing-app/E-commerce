import Form from 'react-bootstrap/Form';
import styles from "./radio.component.module.scss";

const RadioComponent = (props: any) => {
    const { field, handleChange, index } = props;
    
    return (
        <>
            <Form.Label className={styles.label}>{ field.placeholder }: </Form.Label>
            { field.options.map((option: any, i: number) => (
                <Form.Check
                    key={`checkbox-option-${i}`}
                    inline
                    className={styles.radio}
                    id={field.label[i]}
                    label={field.label[i]}
                    name={field.name}
                    type="radio"
                    checked={field.value[i]} 
                    onChange={(event: any) => handleChange(event.target.checked, index, "selection", i)}
                />
            )) }
        </>
    )
}

export default RadioComponent;