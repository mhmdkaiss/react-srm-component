import React from 'react';
import { useIntl } from 'react-intl';
import { MapRound } from '../../models/MapRounds';
import { NCRoundsBattle } from '../NCRoundsBattle/NCRoundsBattle';
import './NCMapRounds.scss';

interface NCMapRoundsProps {
    mapRounds: Array<MapRound>
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

const getStageHeader = (type: string, index: number) : string | undefined => {
    return STAGE_HEADERS[type]?.(index);
};

export const NCMapRounds: React.FunctionComponent<NCMapRoundsProps> = (props: NCMapRoundsProps) => {
    const intl = useIntl();
    return (
        <div className='nc-map-rounds'>
            {props.mapRounds.map((rounds: MapRound, i: number) => {
                const { id, type, index, rounds_battle: roundsBattle, best_of_format: bestOfFormat } = rounds;
                const stageHeader = getStageHeader(type, index);
                return <NCRoundsBattle
                    key={`round_${id}_${i}`}
                    stageHeader={(stageHeader ? intl.formatMessage({ id: `${stageHeader}` }, { round: index }) : 'undefined')}
                    battles={roundsBattle}
                    bestOfFormat={bestOfFormat}
                />;
            })}
        </div>
    );
};
