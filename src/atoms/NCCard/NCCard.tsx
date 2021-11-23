import React from 'react';

interface NCCardProps {
    children: React.ReactChild
}

export const NCCard: React.FunctionComponent<NCCardProps> = ({ children }) => {
    return (
        <React.Fragment>
            <div className="NC-card">
                {children}
            </div>
        </React.Fragment>
    );
};
