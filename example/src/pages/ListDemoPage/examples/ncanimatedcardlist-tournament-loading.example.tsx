import { NCAnimatedCardList, NCCardLoading } from '@cactus/srm-component';
import React from 'react';
import { TOURNAMENTS_CARD_MOCK } from './nccardlist-tournament.example';

export const NCAnimatedCardListTournamentLoadingExample: React.FunctionComponent = () => {
    return (
        <>
            <NCAnimatedCardList
                cards={TOURNAMENTS_CARD_MOCK}
                loadingCard={<NCCardLoading />}
            />
        </>
    );
};
