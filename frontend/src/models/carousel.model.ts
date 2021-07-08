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
}

export const initialCarousel = {
    controls: true,
    defaultActiveIndex: 0,
    fade: false,
    indicators: true,
    interval: 5000,
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