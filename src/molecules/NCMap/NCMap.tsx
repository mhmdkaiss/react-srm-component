import React from 'react';
import { NCOverlappingTitle, NCThumbnail } from '../../atoms';
import './NCMap.scss';

interface NCMapProps {
    mapName: string,
    thumbnail: string,
}

export const NCMap: React.FunctionComponent<NCMapProps> = (props: NCMapProps) => {
    return (
        <React.Fragment>
            <div className='nc-map'>
                <NCThumbnail timg={props.thumbnail} />
                <NCOverlappingTitle title={props.mapName}/>
            </div>
        </React.Fragment>
    );
};
