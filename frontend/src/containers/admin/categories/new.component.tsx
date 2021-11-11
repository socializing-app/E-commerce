import FormsComponent from "../../../shared/forms/forms.component";
import { addCategory } from "../../../services/category.service";
import { process } from "../../../services/form.service";

let filterOptions = [
    {
        name: "name",
        placeholder: "Name",
        value: "",
        options: [],
        type: "textbox",
        width: "12"
    },
    {
        name: "thumbnail",
        placeholder: "Thumbnail image",
        value: [],
        options: [],
        type: "imagechooser",
        width: "12"
    }
]

const NewCategoryComponent = ( props: any ) => {
  return (
        <>   
          <FormsComponent fields={filterOptions} onSave={(form: any) => addCategory(process(form))} />
        </>
  )
}

export default NewCategoryComponent;