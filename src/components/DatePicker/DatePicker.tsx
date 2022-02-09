import './DatePicker.scss';

import { MuiThemeProvider, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

import { ThemePlatform } from '../../styles/Themes';

export interface DatePickerProps {
    label: string;
    initialDate?: string | number;
    value?: string | number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dateChanged: (date?: string) => any;
}

export const DatePicker: React.FunctionComponent<DatePickerProps> = (props: DatePickerProps) => {
    const val = props.value ?
        new Date(props.value || '').getTime() ? new Date(props.value).toISOString().slice(0, 16) : props.value : undefined;
    const defaultVal = props.initialDate ?
        new Date(props.initialDate || '').getTime() ? new Date(props.initialDate).toISOString().slice(0, 16) : props.initialDate : undefined;
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="datepicker-container d-flex w-100 position-relative">
                    {
                        val ?
                            <TextField
                                type="datetime-local"
                                className="w-100 datepicker-input nicecactus-input"
                                value={val}
                                label={props.label}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => { props.dateChanged(event.target.value); }}
                                InputLabelProps={{ shrink: true }}
                            /> :
                            <TextField
                                type="datetime-local"
                                className="w-100 datepicker-input nicecactus-input"
                                defaultValue={defaultVal}
                                label={props.label}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => { props.dateChanged(event.target.value); }}
                                InputLabelProps={{ shrink: true }}
                            />
                    }
                    <div
                        className="icon"
                        style={{
                            maskImage: `url(${process.env.REACT_APP_S3_URL}/media/icons/calendar.svg)`,
                            WebkitMaskImage: `url(${process.env.REACT_APP_S3_URL}/media/icons/calendar.svg)`,
                        }}
                    ></div>
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
