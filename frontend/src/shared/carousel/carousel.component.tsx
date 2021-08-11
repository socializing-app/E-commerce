import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import { Carousel as CarouselModel, CarouselItem } from "../../models/carousel.model";

const CarouselComponent = (props: CarouselModel) => {
    const { controls, defaultActiveIndex, fade, indicators, interval, items, navigation } = props;
    const [index, setIndex] = useState(defaultActiveIndex);

    console.log("carousel: ", props)
    
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    }

    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect} fade={fade} controls={controls} indicators={indicators}>
                { items.map((item: CarouselItem, index: number) =>
                    <Carousel.Item interval={interval} key={`carousel-item-${index}`}>
                        <img className="d-block w-100" src={item.imageSource} alt={`carousel-item-${index}`}/>
                        
                        { item.captionTitle && (
                            <Carousel.Caption>
                                <h3>{ item.captionTitle }</h3>
                                { item.captionParagraph && <p>{ item.captionParagraph }</p> }
                            </Carousel.Caption>
                        ) }
                    </Carousel.Item>
                ) }
            </Carousel>

            { navigation && (
                <ListGroup horizontal>
                    { items.map((item: CarouselItem, index: number) => 
                        <ListGroup.Item onClick={ () => handleSelect(index) } style={{ padding: ".1rem" }} key={`list-item-${index}`}>
                            <img className="d-block w-100" src={item.imageSource} alt={`carousel-list-group-item-${index}`}/>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            ) }
        </>
    )
}

export default CarouselComponent;