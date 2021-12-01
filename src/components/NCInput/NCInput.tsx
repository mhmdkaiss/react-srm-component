import React, { ChangeEvent } from 'react';
import { MuiThemeProvider, TextField } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';

export interface NCInputProps {
    id?: string;
    value: string;
    label?: string;
    type?: string;
    placeHolder?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export const NCInput: React.FunctionComponent<NCInputProps> = ({ id, label, value, placeHolder, type, disabled, onChange }: NCInputProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative">
                    <TextField
                        id={id}
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
