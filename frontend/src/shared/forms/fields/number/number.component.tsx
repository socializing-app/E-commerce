import Form from 'react-bootstrap/Form';
import styles from "./number.component.module.scss";

const NumberComponent = (props: any) => {
    const { field, handleChange, index } = props;

    return (
        <>
            <Form.Label>{ field.placeholder }</Form.Label>
            <Form.Control type="number"
                        className={styles.number}
                        placeholder={field.placeholder} 
                        name={field.name} 
                        value={field.value} 
                        onChange={(event: any) => handleChange(event.currentTarget.value, index, "number")} />
        </>
    )
}

export default NumberComponent;