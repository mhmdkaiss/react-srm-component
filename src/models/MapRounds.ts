export interface RoundMap {
    title: string,
    image?: string
}

export interface RoundMode {
    position: number,
    title: string,
    titleShort?: string
}

export interface RoundsBattle {
    id: string,
    position: number,
    round_map: RoundMap,
    round_mode: RoundMode
}

export interface MapRound {
    best_of_format: number,
    id: string,
    reverseIndex: number,
    index: number,
    rounds_battle: Array<RoundsBattle>,
    type: string
}

export enum TournamentFormat {
    BRACKET = 0,
    ROUND_ROBIN = 1,
    DOUBLE_ELIM = 2,
    ROBIN_BRACKET = 3,
}
