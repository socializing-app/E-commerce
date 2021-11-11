import Form from 'react-bootstrap/Form';

const SelectComponent = (props: any) => {
    const { field, handleChange, index } = props;

    return (
        <div>
            <div>{ field.placeholder }</div>
            { field.options.map((option: any, i: number) => (
                <Form.Check
                    key={`checkbox-option-${i}`}
                    inline
                    label={field.label[i]}
                    name={field.name}
                    type="checkbox"
                    checked={field.value[i]} 
                    onChange={(event: any) => handleChange(event.target.checked, index, "selection", i)}
                />
            )) }
        </div>
    )
}

export default SelectComponent;