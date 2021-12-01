import { MuiThemeProvider, TextareaAutosize } from '@material-ui/core';

import React from 'react';
import { ThemePlatform } from '../../styles/Themes';

export interface NCTextAreaProps {
    value: string;
    placeHolder: string;
    minRows?: number;
    maxRows?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionHook: (search: string) => any;
}

export const NCTextArea: React.FunctionComponent<NCTextAreaProps> = (props: NCTextAreaProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative nicecactus-input">
                    <TextareaAutosize
                        className="w-100"
                        placeholder={props.placeHolder}
                        defaultValue={props.value}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(event: any) => {
                            props.actionHook(event.target.value as string);
                        }}
                        rowsMin={props.minRows}
                        rowsMax={props.maxRows}
                    />
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
