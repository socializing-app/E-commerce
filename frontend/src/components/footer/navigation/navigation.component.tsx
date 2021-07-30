import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import './navigation.component.scss';

const NavigationComponent = ( props: any ) => {
    interface Accordion {
        name: string;
        text: string;
    }

    const accordion: Accordion[] = [
        {
            name: "Our Products",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, velit."
        },
        {
            name: "About Us",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, velit."
        },
        {
            name: "Help",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, velit."
        }
    ]

    return <>
                <Accordion allowZeroExpanded={true}>
                    { accordion.map((item: Accordion, index: number) => (
                        <AccordionItem key={`accordion-item-${index}`}>
                            <AccordionItemHeading>
                                <AccordionItemButton>{ item.name }</AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel><p>{ item.text }</p></AccordionItemPanel>
                        </AccordionItem>
                    )) }
                </Accordion>
           </>
}

export default NavigationComponent;