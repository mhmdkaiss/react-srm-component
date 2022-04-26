import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { ThemePlatform } from '../../styles/Themes';
import { NCChip } from '../NCChip/NCChip';
import { NCPreviewSearch, NCPreviewSearchProps } from '../NCPreviewSearch/NCPreviewSearch';

export interface NCMultiSearchProps extends NCPreviewSearchProps {
    selected: Array<string>;
    compareParam: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDelete: (deleted: any) => void;
    hideSelected?: boolean;
    disabled?: boolean
}

export const NCMultiSearch: React.FunctionComponent<NCMultiSearchProps> = (props: NCMultiSearchProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                {props.selected.length > 0 &&
                    <div className="d-flex mb-2 row">
                        {props.list.filter(item => props.selected.includes(item[props.displayParam])).map((item, index) =>
                            <div key={index} className='mx-3 mb-1' >
                                <NCChip
                                    disabled={props.disabled}
                                    label={item[props.displayParam]}
                                    onChange={() => props.onDelete(item)}
                                    deletion={true}
                                    style={item.style}
                                />
                            </div>

                        )}
                    </div>
                }
                <div className={`nc-preview-search position-relative ${props.disabled ? 'disabled': ''}`}>
                    <NCPreviewSearch
                        searchFields={props.searchFields}
                        placeHolder={props.placeHolder}
                        hideStore={props.hideStore}
                        focusHook={props.focusHook}
                        typingHook={props.typingHook}
                        actionHook={props.actionHook}
                        list={props.hideSelected
                            ? props.list.filter(item => !props.selected.includes(item[props.displayParam]))
                            : props.list
                        }
                        displayParam={props.displayParam}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
