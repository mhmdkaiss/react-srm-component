import { NCAnimatedCardList } from '@cactus/srm-component';
import React from 'react';
import { TOURNAMENTS_CARD_MOCK } from './nccardlist-tournament.example';

export const NCAnimatedCardListTournamentExample: React.FunctionComponent = () => {
    return (
        <>
            <NCAnimatedCardList cards={TOURNAMENTS_CARD_MOCK} />
        </>
    );
};
