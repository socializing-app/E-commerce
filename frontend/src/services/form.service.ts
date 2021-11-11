import { BuildForm } from "../models/form.model"

const friendlyPlaceholder = (field: string) => {
    field = field.replace(/([a-z])([A-Z])/g, '$1 $2');
    field = field[0].toUpperCase() + field.slice(1);

    return field;
}

export const buildForm = (fields: any) => {
    const form: BuildForm[] = [];

    for ( let field in fields ) {
        const newField = {
            name: field,
            placeholder: friendlyPlaceholder(field),
            value: (fields as any)[field],
            options: [],
            type: "textbox",
            width: "12"
        }

        form.push(newField);
    }

    return form;
}

export const updateSelectionField = (filterOptions: any, value: any, index: number, optionIndex: number) => {
    return filterOptions.map((option: any, i: number) => {
        if ( index === i ) {
          return { ...option, value: option.value.map((checked: boolean, optIndex: number) => {
            if ( optIndex === optionIndex ) return value;
            return ( filterOptions[index].type === "select" ) ? checked : false;
          }) }
        }
        return option;
    });
}

export const updateTextField = (filterOptions: any, value: any, index: number) => {
    return filterOptions.map((option: any, i: number) => {
        if ( index === i ) return { ...option, value }
        return option;
    })
}

export const updateSubForm = (filterOptions: any, value: any, index: number, optionIndex: number) => {
    let options = value;
    
    return filterOptions.map((field: any) => {
        if ( field.type === "subform" ) return {
            ...field,
            options
        };

        return field;
    })
}

export const processField = (field: any): any => {
    const getRadioValue = (options: any, values: any) => {
        const selectedIndex = values.findIndex((value: boolean) => value);

        return options[selectedIndex] ? options[selectedIndex] : "";
    }

    switch ( field.type ) {
        case "textbox": return field.value; 
        case "colorchooser": return field.value; 
        case "imagechooser": return field.value.filter((image: string) => image && image !== ""); 
        case "number": return field.value; 
        case "radio": return getRadioValue(field.options, field.value); 
        case "dropdown": return field.value; 
        case "textarea": return field.value;
    }
}

export const process = (form: any) => {
    let fields: any = {};

    form.forEach((field: any) => {
        if ( field.type !== "subform" ) {
            fields[field.name] = processField(field);
        } else {
            const fieldValues: any[] = [];

            field.options.forEach((f: any) => {
                const optionValues: any = {};

                f.forEach((f_: any) => {
                    optionValues[f_.name] = processField(f_);
                })

                console.log(optionValues)
                if ( optionValues.colour === "" ) optionValues.colour = "#333333";
                console.log(optionValues)
                fieldValues.push(optionValues);
            })

            fields[field.name] = fieldValues;
        }
        
    })

    return fields;
}