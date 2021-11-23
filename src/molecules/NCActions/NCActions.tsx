import React from 'react';
import { Button } from '../../atoms';
import { ButtonProps } from '../../atoms/Button/Button';
import './NCActions.scss';

export interface NCActionsProps {
    actions: Array<ButtonProps>,
}

export const NCActions: React.FunctionComponent<NCActionsProps> = ({ actions }) => {
    return (
        <div className="nc-action-container">
            {
                actions.map((m, i) => {
                    return <Button key={i} {...m} />;
                })
            }
        </div>
    );
};
