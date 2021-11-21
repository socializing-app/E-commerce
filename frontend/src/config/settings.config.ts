import { Carousel, initialCarousel } from "../models/carousel.model"

export interface SocialIcon {
    name: string;
    icon: string;
    link: string;
    colour: string;
}

export interface Company {
    name: string;
    copyright: string;
}

export const SocialIcons: SocialIcon[] = [
    {
        name: "Facebook",
        icon: "facebook-square",
        link: "#",
        colour: "#325C7A"
    },
    {
        name: "Twitter",
        icon: "twitter-square",
        link: "#",
        colour: "#1DA1F2"
    },
    {
        name: "LinkedIn",
        icon: "linkedin",
        link: "#",
        colour: "#407AD1"
    }
]

export const CompanyDetails: Company = {
    name: "Smoking Hot",
    copyright: "© 2021 The Smoking Hot International Limited. Registered office: London, UK"
}

export const LandingCarousel: Carousel = {
    ...initialCarousel,
    navigation: false,
    indicators: false,
    controls: false,
    items: [
        {
            imageSource: "https://picsum.photos/800/400"
        },
        {
            imageSource: "https://picsum.photos/800/400"
        },
        {
            imageSource: "https://picsum.photos/800/400"
        }
    ]
}

export const CarouselLoadingStyles = "display: flex; margin: 18.5rem auto; justify-content: center; width: 30rem;";
export const LoadingStyles = "display: flex; justify-content: center; align-items: center; position: absolute; top: 5rem; z-index: 25000; width: 100vw; left: 0; height: calc(100vh - 5rem);  background: white;";
export const LoadingColour = "rgba(0,0,0,.5)";