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