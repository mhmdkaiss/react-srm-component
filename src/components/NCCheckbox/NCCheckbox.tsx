import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { ThemePlatform } from '../../styles/Themes';
import './NCCheckbox.scss';

export interface NCCheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export const NCCheckbox: React.FunctionComponent<NCCheckboxProps> = (props: NCCheckboxProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <label className="nc-checkbox cursor-pointer d-flex align-items-center m-0">
                    <input type="checkbox" onChange={(e) => {props.checked = !props.checked; props.onChange && props.onChange(e.target.checked);}} checked={props.checked || false} />
                    <div className="frame">
                        <Icon icon={IconType.Cross} width={9} height={9} />
                    </div>
                </label>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
