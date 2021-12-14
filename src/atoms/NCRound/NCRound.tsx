import React from 'react';
import { useIntl } from 'react-intl';
import { NCMap } from '../../molecules/NCMap/NCMap';
import './NCRound.scss';

interface NCRoundProps {
    thumbnail: string,
    title: string,
    mapName: string,
    round?: number
}

export const NCRound: React.FunctionComponent<NCRoundProps> = (props: NCRoundProps) => {
    const { round } = props;
    const intl = useIntl();
    return (
        <React.Fragment>
            <div className='nc-round'>
                <p>{`${intl.formatMessage({ id: 'tournament.stepper.round' })} ${(round? ` ${round}` : '')}: ${props.title}`}</p>
                <NCMap thumbnail={props.thumbnail} mapName={props.mapName} />
            </div>
        </React.Fragment>
    );
};
