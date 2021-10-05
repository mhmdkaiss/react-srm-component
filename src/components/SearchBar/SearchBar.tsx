import React, {ChangeEvent, useState} from 'react';
import { Chip, MenuItem, MuiThemeProvider, Select, TextField } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';
import './SearchBar.scss';


interface SearchBarProps {
    searchResult?: { [key: string]: string };
    setSearchResult?: React.Dispatch<any>;
    searchFields: { [key: string]: SearchField };
    hideStore?: boolean;
    actionHook?: (search?: { [key: string]: string }) => any;
    typingHook?: (text: string) => any;
    focusHook?: (isFocused: boolean) => any;
}

interface SearchField {
    label: string
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = (props: SearchBarProps) => {
    const [searchText, setSearchText] = useState<string>('');
    const [searchField, setSearchField] = useState<string>(Object.keys(props.searchFields)[0]);
    const [searchStore, setSearchStore] = useState<{ [key: string]: string }>(props.searchResult || {});

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            doSearch();
        }
    };

    const doSearch = () => {
        const textTrimed = searchText.trim();
        searchStore[searchField] = textTrimed;
        setSearchStore({...searchStore});
        if (props.setSearchResult) {
            props.setSearchResult(searchStore);
        }
        if (props.actionHook) {
            props.actionHook(searchStore);
        }
        setSearchText('');
    }

    const removeItemFromStore = (key: string) => {
        delete searchStore[key];
        setSearchStore({...searchStore});
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
    }

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative searchbar-container">
                    {
                        Object.keys(props.searchFields).length > 1 &&
                        <Select
                            value={searchField}
                            className="mx-3"
                            onChange={(event: ChangeEvent<{ name?: string | undefined, value: unknown}>) => {
                                setSearchField(event.target.value as string)
                            }}
                        >
                            {
                                Object.keys(props.searchFields).map((key: string, index: number) => {
                                    return <MenuItem key={index} value={key}>{props.searchFields[key].label}</MenuItem>
                                })
                            }
                        </Select>
                    }
                    <TextField
                        value={searchText}
                        placeholder="Search team"
                        name="searchBar"
                        className="w-100 searchbar-input"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setSearchText(event.currentTarget.value);
                            if (props.typingHook) {
                                props.typingHook(event.currentTarget.value);
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        inputProps={{ autoComplete: 'off' }}
                        onBlur={() => {
                            if (props.focusHook) {
                                props.focusHook(false);
                            }
                        }}
                    />
                    <div
                        className="search-button"
                        style={{
                            maskImage: `url(${process.env.REACT_APP_S3_URL}/media/icons/search.svg)`,
                            WebkitMaskImage:`url(${process.env.REACT_APP_S3_URL}/media/icons/search.svg)`
                        }}
                        onClick={doSearch}
                    ></div>
                </div>
                <div className="d-flex mt-2">
                    {
                        !props.hideStore && Object.keys(searchStore).map((key: string, index: number) => {
                            return (
                                <Chip
                                    label={`${key}: ${searchStore[key]}`}
                                    key={index}
                                    onDelete={() => removeItemFromStore(key)}
                                    color="primary"
                                    className="ml-2"
                                />
                            );
                        })
                    }
                </div>
            </MuiThemeProvider>
        </React.Fragment>

    );
}