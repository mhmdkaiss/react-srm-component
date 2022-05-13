import React from 'react';
import { NCNextSteps } from '../../molecules';
import './NCLineUp.scss';

interface NCLineUpProps {
    message: string,
    nextSteps: Array<string>
}

export const NCLineUp: React.FunctionComponent<NCLineUpProps> = ({
    message,
    nextSteps
}) => {
    return (
        <React.Fragment>
            <div className="nc-line-up-text-container">
                <p className="welcome-message">{message}</p>
            </div>
            <NCNextSteps steps={nextSteps} />
        </React.Fragment>
    );
};
