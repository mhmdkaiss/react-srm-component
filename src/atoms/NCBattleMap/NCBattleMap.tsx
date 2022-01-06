import React from 'react';
import { NCOverlappingTitle } from '../NCOverlappingTitle/NCOverlappingTitle';
import { NCThumbnail } from '../NCThumbnail/NCThumbnail';
import './NCBattleMap.scss';

interface NCBattleMapProps {
    battleMapName: string,
    thumbnail: string,
}

export const NCBattleMap: React.FunctionComponent<NCBattleMapProps> = (props: NCBattleMapProps) => {
    const { thumbnail } = props;
    return (
        <React.Fragment>
            {thumbnail ?
                <div className='nc-battle-map' >
                    <NCThumbnail timg={thumbnail} />
                    <NCOverlappingTitle title={props.battleMapName}/>
                </div>
                : <div className='nc-battle-no-map'>
                    <p>{props.battleMapName}</p>
                </div>
            }

        </React.Fragment>
    );
};
