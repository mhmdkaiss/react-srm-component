import './NCStepBubble.scss';

import React from 'react';

interface StepBubbleProps {
    stepNumber: number;
    color?: string;
}

export const NCStepBubble: React.FunctionComponent<StepBubbleProps> = ({
    stepNumber
}) => {
    return (
        <div className="nc-step-bubble">
            <p className="nc-step-number">{stepNumber}</p>
        </div>
    );
};
