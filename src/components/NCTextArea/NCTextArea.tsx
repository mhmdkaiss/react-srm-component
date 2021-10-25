import React from 'react';
import {MuiThemeProvider, TextareaAutosize} from '@material-ui/core';
import {ThemePlatform} from '../../styles/Themes';

export interface NCTextAreaProps {
    value: string;
    placeHolder: string;
    minRows?: number;
    maxRows?: number;
    actionHook: (search: string) => any;
}

export const NCTextArea: React.FunctionComponent<NCTextAreaProps> = ({
    value,
    placeHolder,
    actionHook,
    minRows,
    maxRows
}: NCTextAreaProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative nicecactus-input">
                    <TextareaAutosize
                        className="w-100"
                        placeholder={placeHolder}
                        defaultValue={value}
                        onChange={(event: any) => {
                            actionHook(event.target.value as string)
                        }}
                        rowsMin={minRows}
                        rowsMax={maxRows}
                    />
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
}
