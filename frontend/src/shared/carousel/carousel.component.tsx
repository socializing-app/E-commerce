import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Carousel as CarouselModel, CarouselItem } from "../../models/carousel.model";

const CarouselComponent = (props: CarouselModel) => {
    const { controls, defaultActiveIndex, fade, indicators, interval, items } = props;
    const [index, setIndex] = useState(defaultActiveIndex);
    
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    }

    return (
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
    )
}

export default CarouselComponent;