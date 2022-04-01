import { IntlShape } from 'react-intl';
import { RewardKind, Tournament } from '../models/Tournament';

export class TournamentUtilsService {
    static getReward = (tournament:Tournament, intl: IntlShape): string | undefined => {
        const rewards = tournament.rewards;
        if (!rewards) {
            return;
        }
        let formatedCash;
        if (Object.values(rewards).length > 0){
            const cash: number = Object.values(rewards)
                .flat()
                .map(e => e.value)
                .reduce((p, c) => p + c);
            if (tournament.sum || cash > 0) {
                formatedCash = intl.formatNumber(tournament.sum ? tournament.sum : cash, {
                    style: 'currency',
                    currency: rewards[1][0].cur,
                    minimumFractionDigits: 0,
                });
            }
        }
        return formatedCash;
    };

    static gotGift = (tournament:Tournament): boolean => {
        if (tournament.rewards) {
            return !!Object.values(tournament.rewards).flat().find(e => e.kind === RewardKind.GIFT);
        }
        return false;
    };
}
