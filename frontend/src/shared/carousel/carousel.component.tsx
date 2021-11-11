import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import { Carousel as CarouselModel, CarouselItem, initialCarousel } from "../../models/carousel.model";
import styles from "./carousel.component.module.scss";

const CarouselComponent = (props: CarouselModel) => {
    const { controls, defaultActiveIndex, fade, indicators, interval, navigation } = initialCarousel;
    const { items } = props;
    const [index, setIndex] = useState(defaultActiveIndex);
    
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    }

    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect} fade={fade} controls={controls} indicators={indicators} className={styles.items}>
                { items.map((item: CarouselItem, index: number) =>
                    <Carousel.Item interval={interval} key={`carousel-item-${index}`} className={styles.item}>
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
                <ListGroup horizontal className={styles.listitems}>
                    { items.map((item: CarouselItem, ind: number) => 
                        <ListGroup.Item onClick={ () => handleSelect(ind) } className={`${styles.listitem} ${index === ind ? styles.activeitem : ""}`} key={`list-item-${ind}`}>
                            <img src={item.imageSource} alt={`carousel-list-group-item-${ind}`}/>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            ) }
        </>
    )
}

export default CarouselComponent;