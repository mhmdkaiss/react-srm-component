import React from 'react';
import './NCCard.scss';

interface NCCardProps {
    children: React.ReactChild | Array<React.ReactChild>,
    transition?: boolean,
}

export const NCCard: React.FunctionComponent<NCCardProps & React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    transition,
    ...other
}) => {
    let cardClassName = 'nc-card';
    if (other.className) {
        cardClassName += ` ${other.className}`;
    }
    if (transition) {
        cardClassName += ' transition-slide';
    }

    return (
        <React.Fragment>
            <div {...other} className={cardClassName}>
                {children}
            </div>
        </React.Fragment>
    );
};
