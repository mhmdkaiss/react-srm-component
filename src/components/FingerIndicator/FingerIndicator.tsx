import { Icon, IconType } from '../../atoms/Icon/Icon';
import React from 'react';
import './FingerIndicator.scss';

export const FingerIndicator: React.FunctionComponent = () => {
    return (
        <div className='finger-indicator position-relative'>
            <div className='finger-indicator-background position-absolute'></div>
            <Icon icon={IconType.Park} width={40} height={40} />
        </div>
    );
};
