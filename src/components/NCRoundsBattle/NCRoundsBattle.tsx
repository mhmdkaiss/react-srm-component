import React from 'react';
import { NCRound } from '../../atoms/NCRound/NCRound';
import { RoundsBattle } from '../../models/MapRounds';
import './NCRoundsBattle.scss';

interface NCRoundsBattleProps {
    stageHeader: string;
    battles: Array<RoundsBattle>
    bestOfFormat: number
}

export const NCRoundsBattle: React.FunctionComponent<NCRoundsBattleProps> = (props: NCRoundsBattleProps) => {
    const { stageHeader, battles } = props;
    return (
        <React.Fragment>
            {battles.length > 0
                ? <div className='nc-rounds-battle-container'>
                    <p className='nc-stage-header'>{stageHeader}</p>
                    <div className="nc-rounds-battle">
                        {battles.map(({ id, round_map, round_mode }, i) => {
                            const { image } = round_map;
                            return <NCRound
                                key={`round_${id}_${i}`}
                                thumbnail={image ? image : ''}
                                title={round_mode.title}
                                mapName={round_map.title}
                                round={i+1}
                            />;
                        })}
                    </div>
                </div>
                : <div className='nc-rounds-battle-container-best-of-format'>
                    <p className='nc-stage-header-best-of-format'>{stageHeader}</p>
                    <p className='nc-rounds-battle-best-of'>{`Best of ${props.bestOfFormat}`}</p>
                </div>
            }
        </React.Fragment>
    );
};
