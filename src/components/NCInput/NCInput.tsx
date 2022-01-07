import { MuiThemeProvider, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

import { ThemePlatform } from '../../styles/Themes';

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
}

export const NCInput: React.FunctionComponent<NCInputProps> = ({ id, label, value, placeHolder, type, disabled, autofocus, onChange, ref }: NCInputProps) => {
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
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
