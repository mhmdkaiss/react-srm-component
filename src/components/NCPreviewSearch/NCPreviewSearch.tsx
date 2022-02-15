import './NCPreviewSearch.scss';

import React, { useState } from 'react';
import { SearchBar, SearchBarProps } from '../SearchBar/SearchBar';

import { MuiThemeProvider } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';

export interface NCPreviewSearchProps extends SearchBarProps {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    list: Array<{[key: string]: any}>;
    displayParam: string;
    selected?: any,
    onSelection: (clicked: any) => void;
    disabled? : boolean;
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

export const NCPreviewSearch: React.FunctionComponent<NCPreviewSearchProps> = (props: NCPreviewSearchProps) => {
    const [ showList, setShowList ] = useState<boolean>(false);
    const [ search, setSearch ] = useState<string>('');

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="nc-preview-search position-relative">
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
                        typingHook={(text) => setSearch(text)}
                        value={props.value}
                        disabled={props.disabled}
                    />
                    {
                        showList &&
                        <div className="preview-list position-absolute w-100">
                            {
                                props.list
                                    .filter(item => item[props.displayParam].toLowerCase().indexOf(search.toLowerCase()) >= 0)
                                    .map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`preview-item text-elipsis w-100 py-1 ${JSON.stringify(props.selected) === JSON.stringify(item) ? 'selected' : ''}`}
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
