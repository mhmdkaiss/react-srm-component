import { NCChallengeCard, NCColors } from '@cactus/srm-component';
import React from 'react';
import * as ChallengeMocked from '../../mock/Challenges/Challenges.mock';
import './ChallengeCardDemoPage.scss';

export const ChallengeCardDemoPage: React.FunctionComponent = () => {
    return (
        <div className='challenge-demo-page d-flex flex-column'>
            <NCChallengeCard
                challenge={ChallengeMocked.withoutGameSlug}
                color={NCColors.redCoral}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.withGameSlug}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.classic}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.japanese}
                color={NCColors.novice}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.ongonig}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.notAvailable}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.ended}
                color={NCColors.$blueBaltic}
            />
        </div>
    );
};
