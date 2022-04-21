import { OrganisationGame } from './Game';
import { Reward } from './Reward';
import { Sponsor } from './Sponsor';

export enum ContestType {
    PICTURE,
    VIDEO,
    TICKET,
}

export interface Challenge {
	id: string;
	organization: string;
	startDate: string;
    endDate: string;
    featured: boolean;
    type: ContestType;
    partners?: Array<string>;
    discord?: Array<string>;
    twitch?: string;
    isAvailableInRegion: boolean;
	rewards?: { [key: number]: Array<Reward> };
    i18n: {
        title: string;
        description: string;
        rules: string;
        banner: string;
    }
    gameSlug?: string;
    platform?: string;
    sponsors?: Array<Sponsor>;
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

