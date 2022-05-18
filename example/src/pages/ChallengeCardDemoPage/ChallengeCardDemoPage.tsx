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
                goTo={(id) => alert(`Challenge id ${id}`)}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.withGameSlug}
                goTo={() => alert('There are no redirect for demo page')}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.classic}
                goTo={() => alert('The all mocked challenges here have the same id...')}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.japanese}
                color={NCColors.novice}
                goTo={() => alert('Are you really clicking all the buttons??')}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.ongonig}
                goTo={() => alert('If this make you happier, go on...')}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.notAvailable}
                goTo={(id) => alert(`Challenge id 876... Joking! It'is the same ${id}`)}
            />
            <NCChallengeCard
                challenge={ChallengeMocked.ended}
                color={NCColors.$blueBaltic}
                goTo={() => alert('You clicked them all! Congrats!!')}
            />
        </div>
    );
};
