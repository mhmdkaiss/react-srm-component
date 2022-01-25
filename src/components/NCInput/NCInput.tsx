import { MuiThemeProvider, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

import { ThemePlatform } from '../../styles/Themes';
import './NCInput.scss';

export interface NCInputProps {
    ref?: any;
    id?: string;
    value: string | number;
    label?: string;
    type?: string;
    placeHolder?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    autofocus?: boolean;
    iconType?: string;
    iconHook?: () => void;
}

export const NCInput: React.FunctionComponent<NCInputProps> = ({ id, label, value, placeHolder, type, disabled, autofocus, onChange, ref, iconType, iconHook }: NCInputProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative">
                    <TextField
                        ref={ref}
                        id={id}
                        autoFocus={autofocus}
                        className="w-100 nicecactus-input"
                        value={value}
                        placeholder={placeHolder}
                        label={label}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            onChange(event.currentTarget.value);
                        }}
                        type={type}
                        disabled={disabled || false}
                    />
                    {iconType && (<div
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
                    ></div>)}
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
