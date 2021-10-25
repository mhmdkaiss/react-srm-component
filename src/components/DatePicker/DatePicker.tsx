import React, {ChangeEvent} from 'react';
import { MuiThemeProvider, TextField } from '@material-ui/core';
import { ThemePlatform } from '../../styles/Themes';
import './DatePicker.scss';


export interface DatePickerProps {
    label: string;
    initialDate?: string | number;
    dateChanged: (date?: string) => any;
}

export const DatePicker: React.FunctionComponent<DatePickerProps> = ({initialDate, label, dateChanged}: DatePickerProps) => {
    const defaultVal = initialDate ?
        new Date(initialDate || '').getTime() ? new Date(initialDate).toISOString().slice(0, 16) : initialDate : undefined;
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="datepicker-container d-flex w-100 position-relative">
                    <TextField
                        type="datetime-local"
                        className="w-100 datepicker-input nicecactus-input"
                        defaultValue={defaultVal}
                        label={label}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => { dateChanged(event.target.value) }}
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
}