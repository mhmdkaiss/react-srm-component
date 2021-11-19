
import React, { MouseEvent, ReactElement } from 'react';
import { Icon, IconType } from '../Icon/Icon';
import './Button.scss';

export enum ButtonTheme {
    CLASSIC = 'classic',
    TOURNAMENT = 'tournament',
    TRAINING = 'training',
    TRACKING = 'tracking',
    PREMIUM = 'premium',
    RED = 'red',
}

export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

export enum ButtonSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    BIG = 'big'
}

export interface ButtonProps {
    label: string | ReactElement;
    theme?: ButtonTheme;
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    setClick?: (event: MouseEvent) => void;
    styleClass?: string;
    icon?: { type: IconType, width: number, height: number };
    color?: string;
}

export const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    const theme = props.theme || ButtonTheme.CLASSIC;
    const type = props.type || ButtonType.PRIMARY;
    const size = props.size || ButtonSize.MEDIUM;

    const onClick = (event: MouseEvent) => {
        if (props.setClick) {
            props.setClick(event);
        }
    };

    return (
        <div className="button-container" style={{ borderColor: props.color }}>
            <button
                className={`button d-flex align-items-center justify-content-center ${theme} ${type} ${size} ${props.styleClass} ${props.color ? 'custom-hover' : ''}`}
                disabled={props.disabled}
                onClick={onClick}
                style={{ background: [ButtonType.SECONDARY].includes(type) ? undefined : props.color }}
            >
                {props.icon && <Icon styleName="mr-2" icon={props.icon.type} width={props.icon.width} height={props.icon.height} />}
                <span
                    className={`h-100 ${props.disabled ? 'disabled' : [ ButtonTheme.TOURNAMENT, ButtonTheme.TRACKING, ButtonTheme.TRAINING ].includes(theme) && type === ButtonType.SECONDARY ? `${theme} ${type}` : ''}`}
                    style={{
                        color: [ButtonType.SECONDARY].includes(type) ? props.color : undefined,
                        WebkitTextFillColor: [ButtonType.SECONDARY].includes(type) ? props.color : undefined,
                    }}
                >
                    {props.label}
                </span>
            </button>
        </div>
    );
};
