import { MuiThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ThemePlatform } from '../../styles/Themes';
import { SearchBar, SearchBarProps } from '../SearchBar/SearchBar';
import './NCPreviewSearch.scss';

export interface NCPreviewSearchProps extends SearchBarProps {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    list: Array<{[key: string]: any}>;
    displayParam: string;
    selected?: any,
    onSelection: (clicked: any) => void;
    onChange?: (newValue: string) => void;
    disabled? : boolean;
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

export const NCPreviewSearch: React.FunctionComponent<NCPreviewSearchProps> = (props: NCPreviewSearchProps) => {
    const [ showList, setShowList ] = useState<boolean>(false);
    const [ search, setSearch ] = useState<string>('');

    useEffect(() => {
        if (!props.value) {
            setSearch('');
        }
    }, [props.value]);

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className={`nc-preview-search position-relative ${props.disabled ? 'disabled': ''}`}>
                    <SearchBar
                        searchFields={props.searchFields}
                        placeHolder={props.placeHolder}
                        hideStore={props.hideStore}
                        focusHook={(focused) => {
                            setTimeout(() => setShowList(focused), focused ? 0 : 200);
                            if (props.focusHook) {
                                props.focusHook(focused);
                            }
                        }}
                        actionHook={props.actionHook}
                        onChange={props.onChange}
                        typingHook={text => setSearch(text)}
                        value={props.value}
                        disabled={props.disabled}
                    />
                    {
                        showList &&
                        <div className={`preview-list position-absolute w-100 ${props.disabled ? 'disabled' : ''}`}>
                            {props.list
                                .filter(item => item[props.displayParam].toLowerCase().indexOf(search.toLowerCase()) >= 0)
                                .map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={'preview-item text-elipsis w-100 py-1 '+
                                                `${JSON.stringify(props.selected) === JSON.stringify(item) ? 'selected' : ''} `+
                                                `${item.style ? item.style : ''}`
                                            }
                                            onClick={() => {props.onSelection(item);}}
                                        >
                                            {item[props.displayParam]}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
