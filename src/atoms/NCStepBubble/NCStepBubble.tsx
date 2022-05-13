import React from 'react';
import './NCStepBubble.scss';

interface StepBubbleProps {
    stepNumber: number,
    color?: string,
    isFilled?: boolean
}

export const NCStepBubble: React.FunctionComponent<StepBubbleProps> = ({
    stepNumber,
    isFilled,
    color
}) => {
    const style = color ? { color, borderColor: color } : {};
    return (
        <div
            className="nc-step-bubble" style={style}>
            <p className="nc-step-number" style={style}>{stepNumber}</p>
            {isFilled &&
                <div className='bubble-filled' style={{ backgroundColor: color }}></div>
            }
        </div>
    );
};
