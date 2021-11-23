import './NCFlagSelector.scss';
import { MuiThemeProvider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
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
    label?: string;
}

export const NCFlagSelector: React.FunctionComponent<NCFlagSelectorProps> = ({
    languages,
    actionHook,
    publicUrl,
    label,
}: NCFlagSelectorProps) => {
    const _label = label ? label : 'English is the default language when no other language is filled.';

    const [ selectedLang, setSelectedLang ] = useState<string>('en');
    const [ languagesOrdered, setLanguagesOrdered ] = useState<Array<Lang>>([]);

    const prioritizeSort = (a: string, b: string, code: string) => {
        if (a === code) {
            return -1;
        } else if (b === code) {
            return 1;
        }
        return 0;
    };

    useEffect(() => {
        const l = languages.sort((a: Lang, b: Lang) => {
            let tester = 0;
            if ((tester = prioritizeSort(a.code, b.code, 'en')) !== 0) {
                return tester;
            }
            if ((tester = prioritizeSort(a.code, b.code, 'fr')) !== 0) {
                return tester;
            }
            return a.code.localeCompare(b.code, 'en', { numeric: true });
        });
        setLanguagesOrdered(l);
    }, [languages]);

    const handleSelectClick = (code: string) => {
        setSelectedLang(code);
        actionHook(code);
    };

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="flag-selector">
                    <div className="lang-list">
                        {(
                            languagesOrdered.map((l: Lang) => {
                                return (
                                    <span
                                        key={'flag-selector-' + l.code}
                                        className={`flag ${l.code === selectedLang ? 'flag-active' : ''}`}
                                        onClick={() => handleSelectClick(l.code)
                                        }>
                                        <img src={`${publicUrl}/lang/${l._id}/medias/ContentImage`} alt={l.name} />
                                    </span>
                                );
                            })
                        )}
                    </div>
                    <label>{_label}</label>
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
