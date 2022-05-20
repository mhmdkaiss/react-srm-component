export interface Tournament {
    gameSlug: string,
    id: string,
    name: string,
    partner: string,
    platforms: Array<string>,
    min: number,
    date: number,
    entrance: {
        fee: TournamentFee;
    }
    state: TournamentState,
    format?: number,
    settings?: {
        id: string,
        game: string
    },
    rewards?: { [key: number]: Array<TournamentReward> },
    sum?: number,
    matchSettings?: { [value: string]: MatchSettings },
}

export enum TournamentFee {
    FREE = 0,
    PREMIUM = 1,
    PAYMENT = 2,
}

export enum TournamentState {
    Scheduled = 0,
    Generating = 1,
    Started = 2,
    Paused = 3,
    Ended = 4,
    Cancelled = 5,
    Error = 6,
}

export interface TournamentContent {
    banner?: string
    banner_og?: string
    id?: string
    lang?: string
    title?: string
}

export interface TournamentReward {
    cur: string;
    kind: RewardKind;
    value: number;
    partner?: string;
    title?: string;
    image?: string;
    giftId?: string;
}

export enum RewardKind {
    CASH = 'cash',
    GIFT = 'gift',
    COIN = 'coin',
}

export interface MatchSettings {
    min: number;
    max: number;
}
