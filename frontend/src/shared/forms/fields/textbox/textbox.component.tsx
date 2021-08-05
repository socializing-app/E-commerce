import Form from 'react-bootstrap/Form';

const TextBoxComponent = (props: any) => {
    const { field, handleChange, index } = props;

    return (
        <Form.Control type="text"
                      placeholder={field.placeholder} 
                      name={field.name} 
                      value={field.value} 
                      onChange={(event: any) => handleChange(event.currentTarget.value, index)} />
    )
}

export default TextBoxComponent;