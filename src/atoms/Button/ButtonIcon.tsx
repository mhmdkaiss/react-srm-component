
import React, { MouseEvent } from 'react';
import { IconMask } from '../Icon/IconMask';
import { ButtonSize } from './Button';
import './ButtonIcon.scss';

export interface ButtonIconProps {
    name: string;
    icon: string;
    size: ButtonSize;
    fancy?: boolean;
    value?: string;
    active?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    styleClass?: string;
}

export const ButtonIcon: React.FunctionComponent<ButtonIconProps> = ({
    name,
    icon,
    value,
    size,
    fancy = false,
    active = false,
    onClick,
    styleClass,
}) => {
    return (
        <button value={value}
            className={`buttonicon ${fancy?'fancy':''} ${active?'active':''} ${size} d-flex align-items-center justify-content-center ${styleClass}`}
            onClick={onClick}
        >
            <IconMask icon={icon} name={name} />
        </button>
    );
};
