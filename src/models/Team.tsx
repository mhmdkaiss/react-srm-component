import { Player } from './Player';
import { Round } from './Round';

export interface Team extends TeamCardInfo {
    avatar: string;
    ranking: number;
    checkIn: boolean;
    fd: number;
    fr: number;
    fullScore: number;
    pos: number;
    rounds?: { [key: string]: Round };
}

export interface TeamCardInfo {
    name: string;
    tag: string;
    players: { [key: string]: Player };
    slug: string;
    route: string;
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

export interface TeamLeaderboard extends Team {
    score?: string,
}

export enum TeamPermission {
    MEMBER = 0,
    MANAGER = 1,
    OWNER = 2,
}
