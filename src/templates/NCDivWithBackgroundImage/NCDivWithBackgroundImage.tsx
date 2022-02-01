import React from 'react';
import './NCDivWithBackgroundImage.scss';

export interface NCDivWithBackgroundImageProps {
    children: React.ReactNode
    src: string;
}

export const NCDivWithBackgroundImage: React.FunctionComponent<NCDivWithBackgroundImageProps> = (props) => {
    return (
        <div className="nc-div-with-background-image w-100 h-100" style={{ backgroundImage: `url(${props.src})` }}>
            {props.children}
        </div>
    );
};
