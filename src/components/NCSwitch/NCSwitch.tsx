import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';
import './NCSwitch.scss';


export interface NCSwitchProps {
    checked?: boolean;
    onChange: (checked: boolean) => void;
}

export const NCSwitch: React.FunctionComponent<NCSwitchProps> = ({checked, onChange}: NCSwitchProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <label className="nc-switch">
                    <input type="checkbox" onChange={(e) => {checked = !checked; onChange(e.target.checked)}} checked={checked || false} />
                    <span className="slider"></span>
                </label>
            </MuiThemeProvider>
        </React.Fragment>
    );
}