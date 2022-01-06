import React from 'react';
import { MapRound } from '../../models/MapRounds';
import { NCMapRounds } from '../../molecules/NCMapRounds/NCMapRounds';
import './NCRoundsBracket.scss';

export interface NCRoundsBracketProps {
    mapRounds: Array<MapRound>
    themeColor?: string
}

const STAGE_HEADERS = {
    'classic': (index: number) => {
        if (index === 1) {
            return 'round.final';
        }
        return `round.1_${(Math.pow(2, (index-1)))}`;
    },
    'loser_bracket': () => {
        return 'round.loser';
    },
    'third_phase': () => {
        return 'round.third_place';
    },
    'classic_loser_final': () => {
        return 'round.loser.final';
    }
};

const getStageHeader = (index: number, type: string) : string | undefined => {
    return STAGE_HEADERS[type]?.(index);
};

export const NCRoundsBracket: React.FunctionComponent<NCRoundsBracketProps> = (
    props: NCRoundsBracketProps
) => {
    const orderedMapRounds = props.mapRounds.sort(
        (roundA, roundB) =>
            roundA.type.localeCompare(roundB.type) || roundB.index - roundA.index
    );
    return (
        <NCMapRounds
            mapRounds={orderedMapRounds}
            getStageHeader={getStageHeader}
            themeColor={props.themeColor}
        />
    );
};
