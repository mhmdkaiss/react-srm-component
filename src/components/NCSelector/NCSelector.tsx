import './NCSelector.scss';

import { MenuItem, MuiThemeProvider, Select } from '@material-ui/core';
import { NCTheme, getTheme } from '../../styles/Themes';
import React, { ChangeEvent } from 'react';

export interface NCSelectorProps {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    id?: string;
    disabled?: boolean;
    select?: { [key: string]: string };
    selectedField: string;
    selectFields: Array<any>;
    fieldValue: string;
    fieldName: string;
    fieldImage: string;
    defaultOptionLabel?: string;
    theme?: NCTheme;
    actionHook?: (search: string) => any;
}

export const NCSelector: React.FunctionComponent<NCSelectorProps> = (props: NCSelectorProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={getTheme(props.theme)}>

                <div className="nicecactus-selector">
                    <Select
                        className={'w-100'}
                        disabled={props.disabled}
                        value={props.selectedField}
                        onChange={(
                            event: ChangeEvent<{
                                name?: string | undefined;
                                value: unknown;
                            }>
                        ) => {
                            if (props.actionHook) {
                                props.actionHook(event.target.value as string);
                            }
                        }}
                    >
                        {props.selectFields.map((key: any, index: number) => {
                            return (
                                <MenuItem
                                    key={index}
                                    value={key[props.fieldValue]}
                                    className="d-flex d-inline"
                                >
                                    {key[props.fieldImage] &&
                                        <img className="mr-2" src={`${process.env.REACT_APP_S3_URL}/${key[props.fieldImage]}`} alt={''} height={24} width={24} />
                                    }
                                    <div className="d-inline">{props.fieldName} {key[props.fieldValue]}</div>
                                </MenuItem>

                            );
                        })}

                    </Select>
                </div>

            </MuiThemeProvider>
        </React.Fragment>
    );
};
