import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';
import { NCPreviewSearch, NCPreviewSearchProps } from '../NCPreviewSearch/NCPreviewSearch';
import { NCChip } from '../NCChip/NCChip';

export interface NCMultiSearchProps extends NCPreviewSearchProps {
    selected: Array<string>;
    compareParam: string;
    onDelete: (deleted: any) => void;
}

export const NCMultiSearch: React.FunctionComponent<NCMultiSearchProps> = (props: NCMultiSearchProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                {
                    props.selected.length > 0 &&
                    <div className="d-flex mb-2">
                        {
                            props.list.filter(item => props.selected.includes(item[props.displayParam])).map((item, index) => {
                                return (
                                    <div key={index} className={index > 0 ? 'mx-3' : 'mr-3'}>
                                        <NCChip
                                            label={item[props.displayParam]}
                                            onChange={() => props.onDelete(item)}
                                            deletion={true}
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                }
                <div className="nc-preview-search position-relative">
                    <NCPreviewSearch
                        searchFields={props.searchFields}
                        placeHolder={props.placeHolder}
                        hideStore={props.hideStore}
                        focusHook={props.focusHook}
                        typingHook={props.typingHook}
                        actionHook={props.actionHook}
                        list={props.list}
                        displayParam={props.displayParam}
                        onSelection={(item: any) => {
                            if (!props.selected.includes(item[props.compareParam])) {
                                props.onSelection(item);
                            }
                        }}
                        value={props.value}
                    />
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
