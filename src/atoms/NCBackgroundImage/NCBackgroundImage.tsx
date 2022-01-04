
import React from 'react';
import './NCBackgroundImage.scss';

export interface NCBackgroundImageProps {
    src: string;
}

export const NCBackgroundImage: React.FunctionComponent<NCBackgroundImageProps> = ({ src }) => {
    return (
        <div className='nc-background-image-container'>
            <div className='mask d-block'></div>
            <img src={src} draggable={false} />
        </div>
    );
};
