import React from 'react';

export const NCLoader: React.FunctionComponent = () => {
    return (
        <div className="d-flex align-content-center">
            <div className="spin-container m-auto">
                <div className="spin-loader"></div>
                <div className="cactus position-absolute"></div>
            </div>
        </div>

    );
};
