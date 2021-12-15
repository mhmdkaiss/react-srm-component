import React from 'react';
import './NCTitle.scss';

export interface NCTitleProps {
  label: string;
  color?: string;
}

export const NCTitle: React.FunctionComponent<NCTitleProps> = ({ label, color }) => {
    return (
        <div className="nc-title-container">
            <div className="nc-color-led" style={color? { background: color }: {}}/>
            <span>{label}</span>
        </div>
    );
};
