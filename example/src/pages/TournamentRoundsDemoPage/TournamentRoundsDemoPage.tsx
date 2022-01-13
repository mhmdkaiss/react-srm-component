import { NCCard, NCTitle, NCTournamentRounds } from '@cactus/srm-component';
import React from 'react';
import {
    MAP_ROUNDS_BRACKET_MOCK,
    MAP_ROUNDS_BRACKET_NO_IMAGES_MOCK,
    MAP_ROUNDS_DOUBLE_ELIM_MOCK
} from '../../mock/TournamentRounds/TournamentRounds.mock';
import './TournamentRoundsDemoPage.scss';

export const TournamentRoundsDemoPage: React.FunctionComponent = () => {
    const noBattleImagesThemeColor = '#FFC000';
    const doubleElimThemeColor = '#FF0DAE';
    return (
        <React.Fragment>
            <h1 className="secondary-color-light">Tournament Rounds</h1>
            <br/>
            <div className="tournament-rounds-container">
                <NCCard>
                    <NCTitle label='Rounds Bracket' />
                    <NCTournamentRounds
                        displayFormat={0}
                        mapRounds={MAP_ROUNDS_BRACKET_MOCK}
                    />
                </NCCard>
                <div className="rounds-mobile">
                    <NCCard>
                        <NCTitle label='Rounds' />
                        <NCTournamentRounds
                            displayFormat={0}
                            mapRounds={MAP_ROUNDS_BRACKET_MOCK}
                        />
                    </NCCard>
                </div>
            </div>
            <br/>
            <div className="tournament-rounds-container">
                <NCCard>
                    <NCTitle
                        label='Rounds Bracket (without battle images)'
                        color={noBattleImagesThemeColor}
                    />
                    <NCTournamentRounds
                        displayFormat={0}
                        mapRounds={MAP_ROUNDS_BRACKET_NO_IMAGES_MOCK}
                        themeColor={noBattleImagesThemeColor}
                    />
                </NCCard>
                <div className="rounds-mobile">
                    <NCCard>
                        <NCTitle label='Rounds' color={noBattleImagesThemeColor} />
                        <NCTournamentRounds
                            displayFormat={0}
                            mapRounds={MAP_ROUNDS_BRACKET_NO_IMAGES_MOCK}
                            themeColor={noBattleImagesThemeColor}
                        />
                    </NCCard>
                </div>
            </div>
            <br/>
            <div className="tournament-rounds-container">
                <NCCard>
                    <NCTitle
                        label='Rounds Double Elimination'
                        color={doubleElimThemeColor}
                    />
                    <NCTournamentRounds
                        displayFormat={2}
                        mapRounds={MAP_ROUNDS_DOUBLE_ELIM_MOCK}
                        themeColor={doubleElimThemeColor}
                    />
                </NCCard>
                <div className="rounds-mobile" style={{ overflowX: 'hidden', maxHeight: '398px' }}>
                    <NCCard>
                        <NCTitle
                            label='Rounds'
                            color={doubleElimThemeColor}
                        />
                        <NCTournamentRounds
                            displayFormat={2}
                            mapRounds={MAP_ROUNDS_DOUBLE_ELIM_MOCK}
                            themeColor={doubleElimThemeColor}
                        />
                    </NCCard>
                </div>
            </div>
        </React.Fragment>
    );
};

