import { MuiThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ThemePlatform } from '../../styles/Themes';
import './NCFlagSelector.scss';

interface Lang {
    _id: string;
    name: string;
    code: string;
}

export interface NCFlagSelectorProps {
    languages: Array<Lang>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionHook: (search: string) => any;
    publicUrl: string;
    label?: string;
    selectedFlag?: string;
}

export const NCFlagSelector: React.FunctionComponent<NCFlagSelectorProps> = (props: NCFlagSelectorProps) => {
    const intl = useIntl();

    const [ selectedLang, setSelectedLang ] = useState<string>(props.selectedFlag || 'en');
    const [ languagesOrdered, setLanguagesOrdered ] = useState<Array<Lang>>([]);
    const [ initialized, setInitialized ] = useState<boolean>(false);

    const prioritizeSort = (a: string, b: string, code: string) => {
        if (a === code) {
            return -1;
        } else if (b === code) {
            return 1;
        }
        return 0;
    };

    useEffect(() => {
        if (initialized || (!props.languages.length && !languagesOrdered.length)) {
            return;
        }

        const l = props.languages.sort((a: Lang, b: Lang) => {
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
        setInitialized(true);
    }, [props.languages]);

    const handleSelectClick = (code: string) => {
        setSelectedLang(code);
        props.actionHook(code);
    };

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="flag-selector">
                    <div className="lang-list">
                        {languagesOrdered.map((l: Lang) =>
                            <span
                                key={'flag-selector-' + l.code}
                                className={`flag clickable ${l.code === selectedLang ? 'flag-active' : ''}`}
                                onClick={() => handleSelectClick(l.code)}
                            >
                                <img src={`${props.publicUrl}/lang/${l._id}/medias/ContentImage`} alt={l.name} />
                            </span>
                        )}
                    </div>
                    <label>{props.label || intl.formatMessage({
                        id: 'flag-selector.info.message',
                    })}</label>
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
