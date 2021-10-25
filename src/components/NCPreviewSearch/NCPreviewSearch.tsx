import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';
import { SearchBar, SearchBarProps } from '../SearchBar/SearchBar';
import './NCPreviewSearch.scss';


export interface NCPreviewSearchProps extends SearchBarProps {
    list: Array<{[key: string]: any}>;
    displayParam: string;
    onSelection: (clicked: any) => void;
}

export const NCPreviewSearch: React.FunctionComponent<NCPreviewSearchProps> = (props: NCPreviewSearchProps) => {
    const [showList, setShowList] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="nc-preview-search position-relative">
                    <SearchBar
                        searchFields={props.searchFields}
                        placeHolder={props.placeHolder}
                        hideStore={props.hideStore}
                        focusHook={(focused) => {
                            setTimeout(() => setShowList(focused), focused ? 0 : 100);
                            if (props.focusHook) {
                                props.focusHook(focused);
                            }
                        }}
                        actionHook={props.actionHook}
                        typingHook={(text) => setSearch(text)}
                        value={props.value}
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
                                            className="preview-item py-1"
                                            onClick={() => {props.onSelection(item)}}
                                        >
                                            {item[props.displayParam]}
                                        </div>
                                    )
                                })
                        }
                        </div>
                    }
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
}