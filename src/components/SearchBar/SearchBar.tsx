import './SearchBar.scss';

import {
    Chip,
    MenuItem,
    MuiThemeProvider,
    Select,
    TextField,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { ThemePlatform } from '../../styles/Themes';

export interface SearchBarProps {
    searchResult?: { [key: string]: string };
    searchFields: { [key: string]: SearchField };
    placeHolder?: string;
    hideStore?: boolean;
    value?: string;
    overrideKeyDown?: boolean;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    setSearchResult?: React.Dispatch<any>;
    actionHook?: (search?: { [key: string]: string }) => any;
    typingHook?: (text: string) => any;
    focusHook?: (isFocused: boolean) => any;
    setOnKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => any;
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

interface SearchField {
    label: string;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = (props: SearchBarProps) => {
    const [ searchText, setSearchText ] = useState<string>('');
    const [ searchField, setSearchField ] = useState<string>(
        Object.keys(props.searchFields)[0]
    );
    const [ searchStore, setSearchStore ] = useState<{ [key: string]: string }>(
        props.searchResult || {}
    );

    useEffect(() => {
        setSearchText(props.value || '');
    }, [props.value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (props.setOnKeyDown) {
            props.setOnKeyDown(e);
        }
        if (!props.overrideKeyDown && e.key === 'Enter') {
            doSearch();
        }
    };

    const doSearch = () => {
        if (!searchText) {
            return;
        }

        const textTrimed = searchText.trim();
        searchStore[searchField] = textTrimed;
        setSearchStore({ ...searchStore });
        if (props.setSearchResult) {
            props.setSearchResult(searchStore);
        }
        if (props.actionHook) {
            props.actionHook(searchStore);
        }
        setSearchText('');
    };

    const removeItemFromStore = (key: string) => {
        delete searchStore[key];
        setSearchStore({ ...searchStore });
        if (props.setSearchResult) {
            props.setSearchResult(searchStore);
        }
        if (props.actionHook) {
            if (props.actionHook.length) {
                props.actionHook(searchStore);
                return;
            }
            props.actionHook();
        }
    };

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                {!props.hideStore && Object.keys(searchStore).length > 0 && (
                    <div className='d-flex mt-2'>
                        {Object.keys(searchStore).map(
                            (key: string, index: number) => {
                                return (
                                    <Chip
                                        label={`${key}: ${searchStore[key]}`}
                                        key={index}
                                        onDelete={() =>
                                            removeItemFromStore(key)
                                        }
                                        color='primary'
                                        className='ml-2'
                                    />
                                );
                            }
                        )}
                    </div>
                )}
                <div className='d-flex w-100 position-relative searchbar-container'>
                    {Object.keys(props.searchFields).length > 1 && (
                        <Select
                            value={searchField}
                            className='mx-3'
                            onChange={(
                                event: ChangeEvent<{
                                    name?: string | undefined;
                                    value: unknown;
                                }>
                            ) => {
                                setSearchField(event.target.value as string);
                            }}
                        >
                            {Object.keys(props.searchFields).map(
                                (key: string, index: number) => {
                                    return (
                                        <MenuItem key={index} value={key}>
                                            {props.searchFields[key].label}
                                        </MenuItem>
                                    );
                                }
                            )}
                        </Select>
                    )}
                    <TextField
                        value={searchText}
                        placeholder={props.placeHolder}
                        name='searchBar'
                        className='w-100 searchbar-input'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setSearchText(event.currentTarget.value || '');
                            if (props.typingHook) {
                                props.typingHook(event.currentTarget.value);
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        inputProps={{ autoComplete: 'off' }}
                        onFocus={() => {
                            if (props.focusHook) {
                                props.focusHook(true);
                            }
                        }}
                        onBlur={() => {
                            if (props.focusHook) {
                                props.focusHook(false);
                            }
                        }}
                    />
                    <div
                        className='search-button'
                        style={{
                            maskImage: `url(${process.env.REACT_APP_S3_URL}/media/icons/search.svg)`,
                            WebkitMaskImage: `url(${process.env.REACT_APP_S3_URL}/media/icons/search.svg)`,
                        }}
                        onClick={doSearch}
                    ></div>
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
