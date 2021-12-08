import React from 'react';
import './NCCard.scss';

interface NCCardProps {
    children: React.ReactChild | Array<React.ReactChild>
}

export const NCCard: React.FunctionComponent<NCCardProps> = ({ children }) => {
    return (
        <React.Fragment>
            <div className="nc-card">
                {children}
            </div>
        </React.Fragment>
    );
};
