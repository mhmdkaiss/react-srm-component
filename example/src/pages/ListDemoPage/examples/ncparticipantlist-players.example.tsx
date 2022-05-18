import { NCParticipantList } from '@cactus/srm-component';
import React from 'react';
import { PLAYERS_MOCK } from '../../../mock/Utils';

export const NCParticipantListPlayersExample: React.FunctionComponent = () => {
    return (
        <>
            <NCParticipantList list={PLAYERS_MOCK} winners={[PLAYERS_MOCK[0].route]} selected={PLAYERS_MOCK[0].route} />
        </>
    );
};
