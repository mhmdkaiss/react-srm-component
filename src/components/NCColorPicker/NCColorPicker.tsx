import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { getTheme, NCTheme } from '../../styles/Themes';
import { Color, ColorPicker } from 'material-ui-color';

export interface NCColorPickerProps {
    color: Color | string;
    actionHook: (color: string) => void;
    hideInput?: boolean | false;
    disableAlpha?: boolean | true;
    theme?: NCTheme;
}

export const NCColorPicker: React.FunctionComponent<NCColorPickerProps> = (props: NCColorPickerProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={getTheme(props.theme || NCTheme.Platform)}>
                <ColorPicker
                    value={props.color}
                    onChange={(color: Color) => props.actionHook('#' + color.hex)}
                    disableAlpha={props.disableAlpha}
                    hideTextfield={props.hideInput}
                />
            </MuiThemeProvider>
        </React.Fragment>
    );
};
