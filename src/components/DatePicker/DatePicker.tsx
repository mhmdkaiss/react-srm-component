/***
 * MUI Core migration
 *      yarn add -P -D @mui/material @emotion/react @emotion/styled
 *      yarn add -P -D  @mui/material @mui/styled-engine-sc styled-components
 *      yarn add -P -D @mui/icons-material
 * For the full description --> https://mui.com/material-ui/getting-started/installation/
 * It is also necessary to upgrade react lib to version 17
 *      yarn add -D -P react@17.0.0 react-dom@17.0.0
***/
import { MuiThemeProvider, TextField } from '@material-ui/core';
import moment from 'moment';
import React, { ChangeEvent, useRef } from 'react';
import { ThemePlatform } from '../../styles/Themes';
import './DatePicker.scss';

const DATE_FORMAT = 'YYYY-MM-DDTHH:mm';

export interface DatePickerProps {
    label?: string;
    value?: string | number;
    initialValue?: string | number;
    dateChanged: (timestamp: number) => void;
}

export const DatePicker: React.FunctionComponent<DatePickerProps> = (props: DatePickerProps) => {
    const pickerRef = useRef<HTMLInputElement>(null);

    const val = props.value ? moment(props.value).format(DATE_FORMAT) : undefined;
    const defaultVal = props.initialValue ? moment(props.initialValue).format(DATE_FORMAT) : undefined;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.dateChanged(moment(event.target.value).valueOf());
    };

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div
                    className="datepicker-container d-flex position-relative"
                    onClick={() => {
                        pickerRef.current?.focus();
                        if ('showPicker' in HTMLInputElement.prototype) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (pickerRef.current as any).showPicker();
                        }
                    }}
                >
                    <TextField
                        inputRef={pickerRef}
                        type="datetime-local"
                        className="datepicker-input nicecactus-input"
                        value={val}
                        defaultValue={defaultVal}
                        label={props.label}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
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
