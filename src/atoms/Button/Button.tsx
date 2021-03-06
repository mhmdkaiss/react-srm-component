
import React, { MouseEvent, ReactElement } from 'react';
import { FingerIndicator } from '../../components/FingerIndicator/FingerIndicator';
import { Icon, IconType } from '../Icon/Icon';
import './Button.scss';

export enum ButtonTheme {
    CLASSIC = 'classic',
    TOURNAMENT = 'tournament',
    TRAINING = 'training',
    TRACKING = 'tracking',
    PREMIUM = 'premium',
    RED = 'red',
    CUSTOM = 'custom'
}

export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    TEXT = 'text',
}

export enum ButtonSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    BIG = 'big'
}

export interface ButtonProps {
    /* @deprecated label: use children context instead */
    label?: string | ReactElement;
    children?: React.ReactText | React.ReactChild | Array<React.ReactChild>,
    theme?: ButtonTheme;
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    setClick?: (event: MouseEvent) => void;
    styleClass?: string;
    containerClass?: string;
    icon?: { type: IconType, width: number, height: number };
    color?: string;
    buttonAtomType?: 'submit' | 'reset' | 'button' | undefined;
    textColor?: string;
    showFinger?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    const theme = props.theme ?? ButtonTheme.CLASSIC;
    const type = props.type ?? ButtonType.PRIMARY;
    const size = props.size ?? ButtonSize.MEDIUM;

    const onClick = (event: MouseEvent) => {
        if (props.setClick) {
            props.setClick(event);
        }
    };

    return (
        <div
            className={`button-container ${props.containerClass}`}
            style={{ borderColor: props.color }}
        >
            <button
                className={'button d-flex align-items-center justify-content-center'+
                    ` ${theme} ${type} ${size} ${props.styleClass ?? ''}`+
                    `${(!props.disabled && props.color) ? ' custom-hover' : ''}`
                }
                disabled={props.disabled}
                onClick={onClick}
                type={props.buttonAtomType}
                style={{
                    background: (theme === ButtonTheme.CUSTOM)
                        ? props.color
                        : [ButtonType.SECONDARY].includes(type)
                            ? undefined
                            : props.color
                }}
            >
                {props.icon &&
                    <Icon
                        styleName="mr-2"
                        icon={props.icon.type}
                        width={props.icon.width}
                        height={props.icon.height}
                    />
                }
                <span
                    className={'h-100' +
                        `${props.disabled ? ' disabled' : undefined}`+
                        `${[ ButtonTheme.TOURNAMENT,
                            ButtonTheme.TRACKING,
                            ButtonTheme.TRAINING ].includes(theme) &&
                                type === ButtonType.SECONDARY
                            ? ` ${theme} ${type}` : undefined}`
                    }
                    style={{
                        color: props.disabled
                            ? undefined
                            : props?.textColor ||
                                ([ButtonType.SECONDARY].includes(type) && props?.color) ||
                                undefined,
                        WebkitTextFillColor: props.disabled
                            ? undefined
                            : props?.textColor ||
                                ([ButtonType.SECONDARY].includes(type) && props?.color) ||
                                undefined,
                    }}
                >
                    {props.label || props.children}
                    {props.showFinger &&
                        <div className='position-absolute'>
                            <FingerIndicator/>
                        </div>
                    }
                </span>
            </button>
        </div>
    );
};
