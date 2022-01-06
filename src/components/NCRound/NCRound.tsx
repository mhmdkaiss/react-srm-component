import React from 'react';
import { NCRoundBattle } from '../../atoms/NCRoundBattle/NCRoundBattle';
import { RoundsBattle } from '../../models/MapRounds';
import './NCRound.scss';

interface NCRoundProps {
    stageHeader: string;
    battles: Array<RoundsBattle>
    bestOfFormat: number,
    themeColor?: string
}

export const NCRound: React.FunctionComponent<NCRoundProps> = (props: NCRoundProps) => {
    const { stageHeader, battles, themeColor } = props;
    return (
        <React.Fragment>
            {battles.length > 0
                ? <div className='nc-rounds-battle-container'>
                    <p className='nc-stage-header'>{stageHeader}</p>
                    <div className="nc-rounds-battle">
                        {battles.map(({ id, round_map, round_mode }, i) => {
                            const { image } = round_map;
                            return (
                                <NCRoundBattle
                                    key={`round_${id}_${i}`}
                                    thumbnail={image ? image : ''}
                                    title={round_mode.title}
                                    mapName={round_map.title}
                                    round={i+1}
                                />
                            );
                        })}
                    </div>
                </div>
                : <div className='nc-rounds-no-battle-container'>
                    <p className='nc-rounds-no-battle-stage-header'>{stageHeader}</p>
                    <p className='nc-rounds-no-battle-best-of' style={themeColor? { color: themeColor }: {}}>
                        {`Best of ${props.bestOfFormat}`}
                    </p>
                </div>
            }
        </React.Fragment>
    );
};
