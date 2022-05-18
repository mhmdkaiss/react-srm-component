import { GameList } from '@cactus/srm-component';
import React from 'react';
import { NoGame } from '../../../../../dist/src/models/Game';
import { GAMES_MOCK } from '../../../mock/Utils';

export const GameListFancyExample: React.FunctionComponent = () => {
    return (
        <>
            <GameList games={GAMES_MOCK as any as Array<NoGame>} fancy onChange={(e) => e}/>
        </>
    );
};
