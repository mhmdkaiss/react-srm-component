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
    format?: number,
}

export enum TournamentFee {
    FREE = 0,
    PREMIUM = 1,
    PAYMENT = 2,
}
