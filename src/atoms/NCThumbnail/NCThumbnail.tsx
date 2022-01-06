import React from 'react';
import './NCThumbnail.scss';

interface NCThumbnailProps {
    timg: string
}

export const NCThumbnail: React.FunctionComponent<NCThumbnailProps> = (props: NCThumbnailProps) => {
    return (
        <React.Fragment>
            <img className='nc-thumbnail' src={props.timg} draggable={false} />
        </React.Fragment>
    );
};
