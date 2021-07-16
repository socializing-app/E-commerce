import SimpleComponent from "../shared/modal/simple"
import { modalSize } from "../models/modal.model";

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