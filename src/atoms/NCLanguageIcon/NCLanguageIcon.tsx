import React from 'react';
import './NCLanguageIcon.scss';

export interface NCLanguageIconProps {
  language: string;
  onClick: () => void;
}

export const NCLanguageIcon: React.FunctionComponent<NCLanguageIconProps> = (props) => {
    return <div
        className='nc-language-icon d-flex justify-content-center align-items-center text-uppercase cursor-pointer'
        onClick={props.onClick}>
        {props.language}
    </div>;
};
