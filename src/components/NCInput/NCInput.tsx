
import { MuiThemeProvider, TextField } from '@material-ui/core';
import React, { ChangeEvent, useRef } from 'react';
import { ThemePlatform } from '../../styles/Themes';
import './NCInput.scss';
export interface NCInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref?: any;
    id?: string;
    name?: string;
    value: string | number;
    label?: React.ReactText | React.ReactChild | Array<React.ReactChild>;
    type?: string;
    placeHolder?: string;
    onChange?: (value: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChangeV2?: (ev: any) => void;
    disabled?: boolean;
    autofocus?: boolean;
    iconType?: string;
    iconHook?: () => void;
    styleName?: string;
    onBlur?: () => void;
    inputProps?: { [key: string]: number | string }
}

export const NCInput: React.FunctionComponent<NCInputProps> = (props: NCInputProps) => {
    const { iconType, styleName, onChange, onChangeV2, onBlur, iconHook } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div
                    className={`d-flex w-100 position-relative ${styleName ? styleName: ''}`}
                    onClick={() => inputRef.current?.focus()}
                >
                    <TextField
                        ref={props.ref}
                        inputRef={inputRef}
                        id={props.id}
                        name={props.name}
                        autoFocus={props.autofocus}
                        className={`w-100 nicecactus-input ${props.disabled ? 'disabled' : ''}`}
                        value={props.value}
                        placeholder={props.placeHolder}
                        label={props.label}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            if (props.type === 'number' && props.inputProps?.min) {
                                const val = Number(event.currentTarget.value);
                                if (val < props.inputProps.min || val > props.inputProps.max) {
                                    return;
                                }
                            }
                            if (onChange) {
                                onChange(event.currentTarget.value);
                            }
                            if (onChangeV2) {
                                onChangeV2(event.currentTarget);
                            }
                        }}
                        type={props.type}
                        disabled={props.disabled || false}
                        onBlur={() => {
                            if (onBlur) {
                                onBlur();
                            }
                        }}
                        InputProps={{ inputProps: props.inputProps }}
                    />
                    {iconType &&
                        <div
                            className='nc-input-icon'
                            style={{
                                maskImage: `url(${process.env.REACT_APP_S3_URL}/media/icons/${iconType}.svg)`,
                                WebkitMaskImage: `url(${process.env.REACT_APP_S3_URL}/media/icons/${iconType}.svg)`,
                            }}
                            onClick={() => {
                                if (iconHook) {
                                    iconHook();
                                }
                            }}
                        >
                        </div>
                    }
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};

