import React from 'react';
import { useIntl } from 'react-intl';
import { NCRound } from '../../components/NCRound/NCRound';
import { MapRound } from '../../models/MapRounds';

export interface NCMapRoundsProps {
    mapRounds: Array<MapRound>
    themeColor?: string
    getStageHeader?: (index: number, type: string) => string | undefined;
}

export const NCMapRounds: React.FunctionComponent<NCMapRoundsProps> = (props: NCMapRoundsProps) => {
    const intl = useIntl();
    const { themeColor, getStageHeader } = props;
    return (
        <React.Fragment>
            {props.mapRounds.map((round: MapRound, i: number) => {
                const { type, index } = round;
                const stageHeader = getStageHeader ? getStageHeader(index, type) : undefined;
                return (
                    <NCRound
                        key={`round_${round.id}_${i}`}
                        stageHeader={stageHeader
                            ? intl.formatMessage({ id: `${stageHeader}` }, { round: index })
                            : 'undefined'
                        }
                        battles={round.rounds_battle}
                        bestOfFormat={round.best_of_format}
                        themeColor={themeColor}
                    />
                );
            })}
        </React.Fragment>
    );
};
