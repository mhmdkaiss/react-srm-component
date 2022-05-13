import { OrganisationGame } from './Game';
import { Reward } from './Reward';
import { Sponsor } from './Sponsor';

export enum ContestType {
    PICTURE,
    VIDEO,
    TICKET,
}

export interface I18N {
    title: string,
    description: string,
    banner: string,
    rules?: string,
    banner_og?: string,
    banner_promo?: string,
    banner_promo_button?: string,
    banner_promo_text?: string,
    requirements?: Array<string>,
    logo?: string
}

export interface Challenge {
	id: string;
	organization: string;
	startDate: string;
    endDate: string;
    featured: boolean;
    type: ContestType;
    i18n: I18N;
    partners?: Array<string>;
    discord?: Array<string>;
    twitch?: string;
    isAvailableInRegion: boolean;
	rewards?: { [key: number]: Array<Reward> };
    gameSlug?: string;
    platform?: string;
    sponsors?: Array<Sponsor>;
    color?: string;
}

export interface ChallengeExtended extends Challenge {
    banner: string;
    game: OrganisationGame;
    participants: number;
    winner?: string;
}

export interface ChallengeResult {
    date: string;
    id: string;
    media: string;
    route: string;
    score: number;
    username: string;
}
