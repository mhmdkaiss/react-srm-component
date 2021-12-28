export interface Partner {
    id: string;
    name: string;
    image: string;
    social?: SocialLink;
}

export interface SocialLink {
    facebook: string;
    twitter: string;
    twitch: string;
    youtube: string;
    steam: string;
    discord: string;
    instagram: string;
}

export enum SocialEnum {
    Facebook = 'facebook',
    Twitter = 'twitter',
    Twitch = 'twitch',
    YouTube = 'youTube',
    Discord = 'discord',
    Instagram = 'instagram'
}
