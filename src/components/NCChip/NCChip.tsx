import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';
import { Icon, IconType } from "../../atoms/Icon/Icon";
import './NCChip.scss';


export interface NCChipProps {
    label: string;
    checked?: boolean;
    deletion?: boolean;
    onChange: (checked: boolean) => void;
}

export const NCChip: React.FunctionComponent<NCChipProps> = ({ label, checked, onChange, deletion }: NCChipProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div
                    className={`nc-chip d-flex align-items-baseline ${deletion ? 'deletion active' : checked ? 'active' : ''}`}
                    onClick={() => onChange(!checked)}
                >
                    {label}
                    {
                        deletion &&
                        <Icon
                            icon={IconType.Close} width={12} height={12}
                        />
                    }
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
}