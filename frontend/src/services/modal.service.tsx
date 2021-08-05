import SimpleComponent from "../shared/modal/simple"
import { modalSize } from "../models/modal.model";
import FilterModalComponent from "../shared/modal/filter";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";

export const simpleModal = ( show: boolean, 
                             title: string, 
                             bodytext: string, 
                             toggle: (event: boolean) => void, 
                             handleSubmit: () => void,
                             closetext: string = "Close",
                             submittext: string = "Submit",
                             size: typeof modalSize = "lg" ): JSX.Element => {
    
    return <SimpleComponent show={ show } 
                            onHide={ () => toggle(false) } 
                            onSubmit={ () => handleSubmit() } 
                            title={ title } 
                            bodytext={ bodytext }
                            closetext={ closetext }
                            submittext={ submittext } />
}

export const filterModal = ( show: boolean, 
                             title: string, 
                             category: Category, 
                             toggle: (event: boolean) => void, 
                             handleSubmit: (products: Product[]) => void,
                             closetext: string = "Close",
                             submittext: string = "Submit",
                             size: typeof modalSize = "lg" ): JSX.Element => {

    return <FilterModalComponent show={ show } 
                                 onHide={ () => toggle(false) } 
                                 onSubmit={ handleSubmit } 
                                 title={ title } 
                                 category={ category }
                                 closetext={ closetext }
                                 submittext={ submittext } />
}