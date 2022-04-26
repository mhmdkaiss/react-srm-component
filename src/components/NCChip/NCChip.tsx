import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { ThemePlatform } from '../../styles/Themes';
import './NCChip.scss';

export interface NCChipProps {
    label: string;
    checked?: boolean;
    deletion?: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    style?: string;
}

export const NCChip: React.FunctionComponent<NCChipProps> = (props: NCChipProps) => {
    const { label, checked, onChange, deletion, disabled, style } = props;
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div
                    className={'nc-chip d-flex align-items-baseline '+
                        `${disabled ? 'disabled' : ''} `+
                        `${deletion ? 'deletion active' : checked ? 'active' : ''} `+
                        `${style ? style : ''}`
                    }
                    onClick={() => onChange(!checked)}
                >
                    {label}
                    {deletion &&
                        <Icon
                            icon={IconType.Close} width={12} height={12}
                        />
                    }
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
