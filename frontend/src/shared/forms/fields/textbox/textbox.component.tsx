import Form from 'react-bootstrap/Form';

const TextBoxComponent = (props: any) => {
    const { field, handleChange, index } = props;

    return (
        <>
            <Form.Label>{ field.placeholder }</Form.Label>
            <Form.Control type="text"
                        placeholder={field.placeholder} 
                        name={field.name} 
                        value={field.value} 
                        onChange={(event: any) => handleChange(event.currentTarget.value, index, "textbox")} />
        </>
    )
}

export default TextBoxComponent;