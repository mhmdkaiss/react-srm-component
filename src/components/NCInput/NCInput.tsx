import React from 'react';
import { MuiThemeProvider, TextField } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';

export interface NCInputProps {
    label: string;
    value: string;
}

export const NCInput: React.FunctionComponent<NCInputProps> = ({label, value}: NCInputProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative">
                    <TextField
                        className="w-100 nicecactus-input"
                        defaultValue={value}
                        label={label}
                    />
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
}