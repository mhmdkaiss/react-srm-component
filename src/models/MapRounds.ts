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

