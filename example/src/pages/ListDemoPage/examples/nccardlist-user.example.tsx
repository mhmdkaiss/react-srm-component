import { NCCardList, UserCard } from '@cactus/srm-component';
import React from 'react';
import { PLAYER_MOCK } from '../../../mock/UserTeamCards/UserTeamCards.mock';

export const USERS_CARD_MOCK = [...Array(6)].map((_, index) => {
    return (
        <UserCard
            key={`user-card-${index}`}
            playerId={PLAYER_MOCK.id}
            full={false}
            xs={false}
            player={PLAYER_MOCK.player}
        />
    );
});

export const NCCardListUserExample: React.FunctionComponent = () => {
    return (
        <>
            <NCCardList cards={USERS_CARD_MOCK} />
        </>
    );
};
