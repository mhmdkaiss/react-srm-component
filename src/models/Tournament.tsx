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
