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
    const { battles, bestOfFormat } = props;
    return (
        <div className={`nc-rounds-battle-container ${battles.length === 0 ? 'nc-best-of-format' : ''}`}>
            <p className='nc-stage-header'>{props.stageHeader}</p>
            {battles.length > 0
                ? <div className="nc-rounds-battle">
                    {props.battles.map(({ id, round_map, round_mode }, i) => {
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
                : <p className='nc-rounds-battle-best-of-format'>{`Best of ${bestOfFormat}`}</p>
            }
        </div>
    );
};
