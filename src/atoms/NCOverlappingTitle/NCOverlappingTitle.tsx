import React from 'react';
import './NCOverlappingTitle.scss';

interface NCOverlappingTitleProps {
    title: string
}

export const NCOverlappingTitle: React.FunctionComponent<NCOverlappingTitleProps> = (props: NCOverlappingTitleProps) => {
    return (
        <React.Fragment>
            <div className='nc-overlapping-title-container'>
                <p className='nc-overlapping-title'>{ props.title }</p>
            </div>
        </React.Fragment>
    );
};
