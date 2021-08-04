import Dropdown from 'react-bootstrap/Dropdown'

const DropdownComponent = (props: any) => {
    const { field, handleChange, index } = props;

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" style={{width: "100%", backgroundColor: "white", color: "grey", border: "1px solid grey"}}>{ field.value || field.name }</Dropdown.Toggle>

            <Dropdown.Menu style={{width: "100%"}}>
                { field.options.map((optionItem: string, i: number) => (
                    <Dropdown.Item key={`dropdown-item-${optionItem}-${i}`} 
                                    active={optionItem === field.value}
                                    onSelect={(eventKey: any, event: any) => handleChange(event.target.text, index)}>
                                    { optionItem }
                    </Dropdown.Item>
                )) }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownComponent;