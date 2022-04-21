export enum RewardKind {
    CASH = 'cash',
    GIFT = 'gift',
    COIN = 'coin',
}

export interface Reward {
    kind: RewardKind;
    value: number;
    cur: string;
    partner?: string;
    title?: string;
    image?: string;
    game?: string;
}
