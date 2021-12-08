import React from 'react';
import './NCTitle.scss';

export interface NCTitleProps {
  label: string;
}

export const NCTitle: React.FunctionComponent<NCTitleProps> = ({
    label
}) => {
    return (
        <div className="nc-title-container">
            <div className="nc-color-led" />
            <span>{label}</span>
        </div>
    );
};
