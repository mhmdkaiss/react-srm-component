import { NCCardList, NCTournamentCard } from '@cactus/srm-component';
import React from 'react';
import { TOURNAMENT_MOCK } from '../../../mock/Utils';

export const TOURNAMENTS_CARD_MOCK = [...Array(9)].map((_, index) => {
    const i = index % 3;
    const gameId = i ? i === 1 ?
        '5ee2000cca2d921b383b5c94' :
        '5cbefb8ccf473930ea0237f1' :
        '5c436c2c766ea609157540e8';
    const gameName = i ? i === 1 ?
        'Small game' :
        'Long game name' :
        'Very very long game name';
    return (
        <NCTournamentCard
            key={`tournament-card-${index}`}
            tournament={TOURNAMENT_MOCK}
            gameName={gameName}
            banner={`${process.env.REACT_APP_S3_PUBLIC_URL}/game/${gameId}/medias/TournamentBanner`}
            prize="10"
            forceSmall={true}
        />
    );
});

export const NCCardListTournamentExample: React.FunctionComponent = () => {
    return (
        <>
            <NCCardList cards={TOURNAMENTS_CARD_MOCK} />
        </>
    );
};
