import React from 'react';
import { NCStepBubble } from '../../atoms';
import './NCNextSteps.scss';
import './NCStep.scss';

export interface NCNextStepsProps {
    steps: Array<string>,
    color?: string,
    stepsFilled?: boolean
}

export const NCNextSteps: React.FunctionComponent<NCNextStepsProps> = ({
    steps,
    color,
    stepsFilled
}) => {
    return (
        <div className="nc-next-steps-container">
            {steps.map((text: string, i: number) =>
                <div className ="nc-step" key={`step_${i}`}>
                    <NCStepBubble
                        stepNumber={i+1}
                        color={color}
                        isFilled={stepsFilled}
                    />
                    <p className="nc-step-description">{text}</p>
                </div>
            )}
        </div>
    );
};
