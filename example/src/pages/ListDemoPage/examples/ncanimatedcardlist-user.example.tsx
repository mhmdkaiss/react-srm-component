import { NCAnimatedCardList } from '@cactus/srm-component';
import React from 'react';
import { USERS_CARD_MOCK } from './nccardlist-user.example';

export const NCAnimatedCardListUserExample: React.FunctionComponent = () => {
    return (
        <>
            <NCAnimatedCardList cards={USERS_CARD_MOCK} maxCardWidth={440}/>
            <div className="col-4 text-center">
                <div>This style is there just to test with another card</div>
                <div>{'It\'s only on example page, not in the shared library'}</div>
            </div>
        </>
    );
};
