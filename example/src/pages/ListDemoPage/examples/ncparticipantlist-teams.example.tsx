import { NCParticipantList } from '@cactus/srm-component';
import React from 'react';
import { TEAMS_MOCK } from '../../../mock/Utils';

export const NCParticipantListTeamsExample: React.FunctionComponent = () => {
    return (
        <>
            <NCParticipantList list={TEAMS_MOCK} winners={[TEAMS_MOCK[0].route]} selected={TEAMS_MOCK[0].route} />
        </>
    );
};
