import { Player } from "./Player";
import { Round } from "./Round";

export interface Team {
    team: string;
    name: string;
    avatar: string;
    ranking: number;
    tag: string;
    players: { [key: string]: Player };
    checkIn: boolean;
    fd: number;
    fr: number;
    fullScore: number;
    pos: number;
    rounds?: { [key: string]: Round };
    slug: string;
}
export interface TeamBracket extends Team {
    pending?: boolean;
    winner?: boolean;
    logged?: boolean;
}

export interface TeamRanking {
    team: Team;
    played: number;
    win: number;
    draw: number;
    fullScore: number;
    fullDiff: number;
    fullResult: number;
    captainUserId?: string;
}
