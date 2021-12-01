import './NCCheckbox.scss';

import { Icon, IconType } from '../../atoms/Icon/Icon';

import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { ThemePlatform } from '../../styles/Themes';

export interface NCCheckboxProps {
    checked?: boolean;
    onChange: (checked: boolean) => void;
}

export const NCCheckbox: React.FunctionComponent<NCCheckboxProps> = (props: NCCheckboxProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <label className="nc-checkbox cursor-pointer">
                    <input type="checkbox" onChange={(e) => {props.checked = !props.checked; props.onChange(e.target.checked);}} checked={props.checked || false} />
                    <div className="frame">
                        <Icon icon={IconType.Cross} width={9} height={9} />
                    </div>
                </label>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
