import React, {ChangeEvent} from 'react';
import {MuiThemeProvider, TextField} from '@material-ui/core';
import {ThemePlatform} from '../../styles/Themes';

export interface NCInputProps {
    value: string;
    label?: string;
    type?: string;
    placeHolder?: string;
    onChange: (value: string) => void;
}

export const NCInput: React.FunctionComponent<NCInputProps> = ({label, value, placeHolder, type, onChange}: NCInputProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative">
                    <TextField
                        className="w-100 nicecactus-input"
                        defaultValue={value}
                        placeholder={placeHolder}
                        label={label}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            onChange(event.currentTarget.value);
                        }}
                        type={type}
                    />
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
}
