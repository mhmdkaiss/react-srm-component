import './NCPreviewSearchAsync.scss';

import { MuiThemeProvider, TextField } from '@material-ui/core';
import { NCTheme, getTheme } from '../../styles/Themes';
import React, { useEffect, useRef, useState } from 'react';

export interface NCPreviewSearchAsyncProps {
    id?: string;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    list: Array<{ [key: string]: any }>;
    displayParam: string;
    label: string;
    onSelection: (clicked: any) => void;
    onType: (text: string) => void;
    debounceOnType?: number;
    loading: boolean;
    noResultMessage: string;
    loadingMessage?: string;
    theme?: NCTheme;
    /* eslint-enable @typescript-eslint/no-explicit-any */
    disabled?: boolean;
}

export const NCPreviewSearchAsync: React.FunctionComponent<NCPreviewSearchAsyncProps> = (props: NCPreviewSearchAsyncProps) => {
    const [ waiting, setWaiting ] = useState<boolean>(false);
    const [ search, setSearch ] = useState<string>('');
    const [ callOnType, setCallOnType ] = useState<number>();
    const [ selected, setSelected ] = useState<number>(0);
    const [ focus, setFocus ] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, props.list.length);
    }, [props.list]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newSelected = Math.max(0, selected - 1);
            const itemOffset =
                    itemsRef.current[newSelected]?.offsetTop || 0;
            if (listRef.current && itemOffset < listRef.current.scrollTop) {
                listRef.current?.scrollTo(
                    0,
                    itemsRef.current[newSelected]?.offsetTop || 0
                );
            }
            setSelected(newSelected);
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newSelected = Math.min(
                props.list.length - 1,
                selected + 1
            );

            const itemHeight =
                    itemsRef.current[newSelected]?.offsetHeight || 0;
            const itemStart = itemsRef.current[newSelected]?.offsetTop || 0;
            const itemEnd = itemStart + itemHeight;
            if (
                listRef.current &&
                    itemEnd >=
                        listRef.current.scrollTop +
                            listRef.current?.offsetHeight
            ) {
                listRef.current?.scrollTo(
                    0,
                    itemEnd - listRef.current?.offsetHeight
                );
            }
            setSelected(newSelected);
        }
        if (e.key === 'Enter') {
            handleSelected();
        }
    };

    const handleSelected = () => {
        if (search && props.list.length > 0) {
            props.onSelection(props.list[selected]);
            setSelected(0);
            setSearch('');
        }
    };

    const handleOnType = (text: string) => {
        setWaiting(true);
        if (callOnType) {
            window.clearTimeout(callOnType);
        }
        setCallOnType(
            window.setTimeout(() => {
                props.onType(text);
                setWaiting(false);
            }, props.debounceOnType || 0)
        );
    };

    return (
        <React.Fragment>
            <MuiThemeProvider
                theme={getTheme(props.theme || NCTheme.Platform)}
            >
                <div
                    onBlur={() => setFocus(false)}
                    className='nc-preview-search-async w-100 position-relative'
                >
                    <TextField
                        id={props.id}
                        inputRef={inputRef}
                        className='w-100 nc-async-search-input'
                        label={props.label}
                        onClick={() => inputRef.current?.focus()}
                        onChange={(event) => {
                            handleOnType(event.currentTarget.value);
                            setSearch(event.currentTarget.value);
                        }}
                        value={search}
                        onKeyDown={onKeyDown}
                        onFocus={() => setFocus(true)}
                        onBlur={(e) => e.stopPropagation()}
                        disabled={props.disabled}
                    />
                    {focus && search.trim() && (
                        <div
                            ref={listRef}
                            className='preview-list position-absolute w-100'
                        >
                            {!waiting &&
                                    !props.loading &&
                                    props.list.map((item, index) => {
                                        return (
                                            <div
                                                onMouseEnter={() =>
                                                    setSelected(index)
                                                }
                                                key={index}
                                                ref={(el) =>
                                                    (itemsRef.current[index] =
                                                        el)
                                                }
                                                className={`preview-item py-1 ${
                                                    selected === index
                                                        ? 'selected'
                                                        : ''
                                                }`}
                                                onClick={() => handleSelected()}
                                            >
                                                {item[props.displayParam]}
                                            </div>
                                        );
                                    })}
                            {(waiting || props.loading) && (
                                <div className='preview-item py-1'>
                                    {props.loadingMessage || 'Loading'}
                                </div>
                            )}
                            {!waiting &&
                                    !props.loading &&
                                    search &&
                                    props.list.length === 0 && (
                                <div className='preview-item py-1'>
                                    {props.noResultMessage}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
