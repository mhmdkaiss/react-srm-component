import "./NCFlagSelector.scss";
import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { ThemePlatform } from '../../styles/Themes';

interface Lang {
    _id: string;
    name: string;
    code: string;
    iso2: string;
}

export interface NCFlagSelectorProps {
    languages: Array<Lang>;
    actionHook: (search: string) => any;
    publicUrl: string;
}

export const NCFlagSelector: React.FunctionComponent<NCFlagSelectorProps> = ({ languages, actionHook, publicUrl }: NCFlagSelectorProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="lang-list">
                    {(
                        languages.map((l: Lang) => {
                            return (
                                <span key={"flag-selector-" + l.code} onClick={() => actionHook(l.code)}><img src={`${publicUrl}/lang/${l._id}/medias/ContentImage`} alt={l.name} /></span>
                            )
                        })
                    )}
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
}