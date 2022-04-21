import React from 'react';
import './NCProgressBar.scss';

export interface NCProgressBarProps {
    width: string;
    height?: number;
    ratio?: number;
    color?: string;
}

export const NCProgressBar: React.FunctionComponent<NCProgressBarProps> = (
    props: NCProgressBarProps
) => {
    const ratio = props.ratio ? props.ratio : 0;
    const height = props.height ? `${props.height}px` : '8px';
    return (
        <div
            className='nc-progress-bar'
            style={{ width: `${props.width}`, height: height }}
        >
            <div
                className='in-progress'
                style={{ width: `${ratio*100}%`, background: props?.color }}>
            </div>
        </div>
    );
};
