import React from 'react';
import { NCStepBubble } from '../../atoms';
import './NCNextSteps.scss';
import './NCStep.scss';

export interface NCNextStepsProps {
    steps: Array<string>,
}

export const NCNextSteps: React.FunctionComponent<NCNextStepsProps> = ({ steps }) => {
    return (
        <div className="nc-next-steps-container">
            {
                steps.map((text: string, i: number) => {
                    return (
                        <div className ="nc-step" key={`step_${i}`}>
                            <NCStepBubble stepNumber={i+1} />
                            <p className="nc-step-description">{text}</p>
                        </div>
                    );
                })
            }
        </div>
    );
};
