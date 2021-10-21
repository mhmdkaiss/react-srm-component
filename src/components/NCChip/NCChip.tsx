import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';
import './NCChip.scss';


export interface NCChipProps {
    label: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
}

export const NCChip: React.FunctionComponent<NCChipProps> = ({ label, checked, onChange }: NCChipProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div
                    className={`nc-chip d-flex ${checked ? 'active' : ''}`}
                    onClick={() => onChange(!checked)}
                >
                    {label}
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
}