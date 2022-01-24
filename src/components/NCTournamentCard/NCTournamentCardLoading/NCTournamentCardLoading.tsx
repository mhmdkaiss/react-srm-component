import React from 'react';
import './NCTournamentCardLoading.scss';

export const NCTournamentCardLoading: React.FunctionComponent = () => {
    return (
        <div className='nc-tournament-card-loading'>
            <div className='nc-loading placeholder-banner mb-2'></div>
            <div className='nc-loading placeholder-row'></div>
            <div className='nc-loading placeholder-row w-75 my-1'></div>
            <div className='nc-loading placeholder-row'></div>
        </div>
    );
};
