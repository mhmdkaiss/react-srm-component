import './NCSwitch.scss';

import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { ThemePlatform } from '../../styles/Themes';

export interface NCSwitchProps {
    checked?: boolean;
    onChange: (checked: boolean) => void;
}

export const NCSwitch: React.FunctionComponent<NCSwitchProps> = (props: NCSwitchProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <label className="nc-switch">
                    <input type="checkbox" onChange={(e) => {props.checked = !props.checked; props.onChange(e.target.checked);}} checked={props.checked || false} />
                    <span className="slider"></span>
                </label>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
