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
    name: "Hungry Team",
    copyright: "© 2021 The Hungry Team International Limited. Registered office: London, UK"
}