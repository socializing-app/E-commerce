export interface CarouselItem {
    imageSource: string;
    captionTitle?: string;
    captionParagraph?: string;
}

export interface Carousel {
    controls?: boolean;
    defaultActiveIndex?: number;
    fade?: boolean;
    indicators?: boolean;
    interval?: number;
    items: CarouselItem[];
    navigation?: boolean;
}

export const initialCarousel = {
    controls: true,
    defaultActiveIndex: 0,
    fade: false,
    indicators: false,
    interval: 5000,
    navigation: true,
    items: [
        {
            imageSource: "https://picsum.photos/800/400",
            captionTitle: "Caption Title",
            captionParagraph: "Caption Paragraph"
        },
        {
            imageSource: "https://picsum.photos/800/400",
            captionTitle: "Caption Title",
            captionParagraph: "Caption Paragraph"
        },
        {
            imageSource: "https://picsum.photos/800/400",
            captionTitle: "Caption Title",
            captionParagraph: "Caption Paragraph"
        }
    ]
}

export const getCarouselItems = (images: string[]): CarouselItem[] => {
    if ( images && images.length ) {
        return images.map((image: string) => { return { imageSource: image } });
    } else {
        return initialCarousel.items;
    }
}