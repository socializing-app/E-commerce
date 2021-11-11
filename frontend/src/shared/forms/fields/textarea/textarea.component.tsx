import Form from 'react-bootstrap/Form';

const TextAreaComponent = (props: any) => {
    const { field, handleChange, index } = props;

    return (
        <>
            <Form.Label>{ field.placeholder }</Form.Label>
            <Form.Control as="textarea" 
                        rows={3}
                        placeholder={field.placeholder} 
                        name={field.name} 
                        value={field.value} 
                        onChange={(event: any) => handleChange(event.currentTarget.value, index, "textbox")} />
        </>
    )
}

export default TextAreaComponent;