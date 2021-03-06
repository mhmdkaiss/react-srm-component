import './ButtonIcon.scss';

import React, { MouseEvent } from 'react';

import { ButtonSize } from './Button';
import { IconMask } from '../Icon/IconMask';
import { Tooltip } from '@material-ui/core';

export interface ButtonIconProps {
    name: string;
    icon: string;
    size: ButtonSize;
    fancy?: boolean;
    value?: string;
    active?: boolean;
    tooltipTitle?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    styleClass?: string;
    disabled?: boolean ;
}

const renderButtonIcon = (props: ButtonIconProps) => {
    return (
        <button value={props.value}
            className={`buttonicon ${props.fancy?'fancy':''} ${props.disabled ? 'disabled' : ''} ${props.active?'active':''} ${props.size} d-flex align-items-center justify-content-center ${props.styleClass}`}
            onClick={(e) => {
                if (!props.disabled && props.onClick) {
                    props.onClick(e);
                }
            }}
        >
            <IconMask icon={props.icon} name={props.name} />
        </button>
    );
};

export const ButtonIcon: React.FunctionComponent<ButtonIconProps> = (props: ButtonIconProps) => {
    return (
        props.tooltipTitle ?
            <Tooltip title={props.tooltipTitle}>
                <div>
                    {renderButtonIcon(props)}
                </div>
            </Tooltip> :
            renderButtonIcon(props)
    );
};
