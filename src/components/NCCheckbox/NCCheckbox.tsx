import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';
import { Icon, IconType } from "../../atoms/Icon/Icon";
import './NCCheckbox.scss';


export interface NCCheckboxProps {
    checked?: boolean;
    onChange: (checked: boolean) => void;
}

export const NCCheckbox: React.FunctionComponent<NCCheckboxProps> = ({checked, onChange}: NCCheckboxProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <label className="nc-checkbox cursor-pointer">
                    <input type="checkbox" onChange={(e) => {checked = !checked; onChange(e.target.checked)}} checked={checked || false} />
                    <div className="frame">
                        <Icon icon={IconType.Cross} width={9} height={9} />
                    </div>
                </label>
            </MuiThemeProvider>
        </React.Fragment>
    );
}