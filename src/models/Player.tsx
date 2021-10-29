export interface Player {
    name: string;
    captain: boolean;
    premium: boolean | Premium;
    account: string;
    elo: number;
}

export enum PremiumStatus {
    PREMIUM = 'PREMIUM',
    NONE = 'NONE',
}
export interface Premium {
    status: PremiumStatus;
    until: string;
}
