import React from 'react';
import { MapRound } from '../../models/MapRounds';
import { NCMapRounds } from '../../molecules/NCMapRounds/NCMapRounds';
import './NCRoundsResult.scss';

export interface NCRoundsResultProps {
    resultHeader: string,
    mapRounds: Array<MapRound>
    themeColor?: string
}

const getStageHeader = (index: number) : string | undefined => {
    return index === 1 ? 'round.final' : `round.1_${(Math.pow(2, (index-1)))}`;
};

export const NCRoundsResult: React.FunctionComponent<NCRoundsResultProps> = (
    props: NCRoundsResultProps
) => {
    const orderedMapRounds = props.mapRounds.sort(
        (roundA, roundB) =>
            roundA.type.localeCompare(roundB.type) || roundA.index - roundB.index
    );
    return (
        <div className='nc-rounds-result'>
            <p className='nc-rounds-result-header'>{props.resultHeader}</p>
            <div className='rounds-container'>
                <NCMapRounds
                    mapRounds={orderedMapRounds}
                    getStageHeader={getStageHeader}
                    themeColor={props.themeColor}
                />
            </div>
        </div>
    );
};
