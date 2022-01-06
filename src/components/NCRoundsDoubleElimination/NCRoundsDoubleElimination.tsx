import React from 'react';
import { useIntl } from 'react-intl';
import { MapRound } from '../../models/MapRounds';
import { NCRoundsResult } from '../NCRoundsResult/NCRoundsResult';
import './NCRoundsDoubleElimination.scss';

export interface NCRoundsDoubleEliminationProps {
    mapRounds: Array<MapRound>
    themeColor?: string
}

export const NCRoundsDoubleElimination: React.FunctionComponent<NCRoundsDoubleEliminationProps> = (
    props: NCRoundsDoubleEliminationProps
) => {
    const { mapRounds, themeColor } = props;
    const intl = useIntl();

    function filterRoundsByType(filter: string) : Array<MapRound> {
        return mapRounds.filter((round: MapRound) => round.type === filter);
    }
    const grandFinalRounds = mapRounds.find((r: MapRound) => r.type === 'classic_loser_final');
    const winnerRounds = filterRoundsByType('classic');
    const loserRounds = filterRoundsByType('loser_bracket');
    return (
        <div className='nc-rounds-double-elimination'>
            <div className='grand-final-container' >
                <p className='grand-final-header'>
                    {intl.formatMessage({ id: 'round.grand.final' })}
                </p>
                <p className='grand-final-best-of'>
                    {`Best of ${grandFinalRounds?.best_of_format}`}
                </p>
            </div>
            <div className='rounds-result-container'>
                <NCRoundsResult
                    resultHeader={intl.formatMessage({
                        id: 'tournament.match.map.rounds.double_elim.winner'
                    })}
                    mapRounds={winnerRounds}
                    themeColor={themeColor}
                />
                <NCRoundsResult
                    resultHeader={intl.formatMessage({
                        id: 'tournament.match.map.rounds.double_elim.loser'
                    })}
                    mapRounds={loserRounds}
                    themeColor={themeColor}
                />
            </div>
        </div>
    );
};
