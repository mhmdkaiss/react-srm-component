import React from 'react';
import { useIntl } from 'react-intl';
import { NCBattleMap } from '../NCBattleMap/NCBattleMap';
import './NCRoundBattle.scss';

interface NCRoundBattleProps {
    thumbnail: string,
    title: string,
    mapName: string,
    round?: number
}

export const NCRoundBattle: React.FunctionComponent<NCRoundBattleProps> = (props: NCRoundBattleProps) => {
    const { round } = props;
    const intl = useIntl();
    const battleTitle = `${intl.formatMessage({ id: 'tournament.stepper.round' })} ${(round? ` ${round}` : '')}: ${props.title}`;
    return (
        <React.Fragment>
            <div className='nc-round-battle'>
                <p>{battleTitle}</p>
                <NCBattleMap thumbnail={props.thumbnail} battleMapName={props.mapName} />
            </div>
        </React.Fragment>
    );
};
