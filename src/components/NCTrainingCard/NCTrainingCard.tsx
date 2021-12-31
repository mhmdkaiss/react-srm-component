import './NCTrainingCard.scss';

import React from 'react';

interface NCTrainingCardProps {
    name: string;
    image: string;
}

export const NCTrainingCard: React.FunctionComponent<NCTrainingCardProps> = (props: NCTrainingCardProps) => {
    return (
        <div className="nc-training-card m-1">
            <div className="mb-1">
                <img src={props.image} />
            </div>
            <span>{props.name}</span>
        </div>
    );
};
