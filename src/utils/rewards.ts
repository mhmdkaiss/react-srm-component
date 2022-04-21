import { useIntl } from 'react-intl';
import { Reward } from '../models/Reward';

export const flatRewards = (rewards?: {[key: number]: Array<Reward>}): Array<Reward> => {
    return rewards ?
        Object.values(rewards).reduce((acc, val) => acc.concat(val), [])
        : [];
};

export const rewardsToString = (rewards?: {[key: number]: Array<Reward>}): string => {
    const flat = flatRewards(rewards);
    if (flat && flat.length > 0) {
        const amount = flat.reduce((tot, reward) => tot + reward.value, 0);
        return useIntl().formatNumber(
            amount,
            {
                style: 'currency',
                currency: flat[0].cur?.toUpperCase(),
                currencyDisplay: 'symbol',
                minimumFractionDigits: 0,
            }
        );
    }
    return '';
};

