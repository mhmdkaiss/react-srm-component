
import { MuiThemeProvider, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { ThemePlatform } from '../../styles/Themes';
import './NCInput.scss';
export interface NCInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref?: any;
    id?: string;
    value: string | number;
    label?: React.ReactText | React.ReactChild | Array<React.ReactChild>;
    type?: string;
    placeHolder?: string;
    onChange: (value: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChangeV2?: (ev: any) => void;
    disabled?: boolean;
    autofocus?: boolean;
    iconType?: string;
    iconHook?: () => void;
    styleName?: string;
    onBlur?: () => void;
}

export const NCInput: React.FunctionComponent<NCInputProps> = (props: NCInputProps) => {
    const { iconType, styleName, onChange, onChangeV2, onBlur, iconHook } = props;
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className={`d-flex w-100 position-relative ${styleName ? styleName: ''}`}>
                    <TextField
                        ref={props.ref}
                        id={props.id}
                        autoFocus={props.autofocus}
                        className={`w-100 nicecactus-input ${props.disabled ? 'disabled' : ''}`}
                        value={props.value}
                        placeholder={props.placeHolder}
                        label={props.label}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
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

