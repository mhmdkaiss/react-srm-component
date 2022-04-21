import React from 'react';
import './NCCardLoading.scss';

export const NCCardLoading: React.FunctionComponent = () => {
    return (
        <div className='nc-card-loading'>
            <div className='nc-loading placeholder-banner mb-2'></div>
            <div className='nc-loading placeholder-row'></div>
            <div className='nc-loading placeholder-row w-75 my-1'></div>
            <div className='nc-loading placeholder-row'></div>
        </div>
    );
};
