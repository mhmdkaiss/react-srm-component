/***
 * MUI Core migration
 *      yarn add -P -D @mui/material @emotion/react @emotion/styled
 *      yarn add -P -D  @mui/material @mui/styled-engine-sc styled-components
 *      yarn add -P -D @mui/icons-material
 * For the full description --> https://mui.com/material-ui/getting-started/installation/
 * It is also necessary to upgrade react lib to version 17
 *      yarn add -D -P react@17.0.0 react-dom@17.0.0
***/
// import { TextField as MuiTextField } from '@mui/material';
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MuiThemeProvider, TextField } from '@material-ui/core';
import React, { ChangeEvent, useRef } from 'react';
import { ThemePlatform } from '../../styles/Themes';
import './DatePicker.scss';

export interface DatePickerProps {
    label: string;
    initialDate?: string | number;
    value?: string | number;
    dateChanged: (date?: string) => void;
}

export const DatePicker: React.FunctionComponent<DatePickerProps> = (props: DatePickerProps) => {
    const pickerRef = useRef<HTMLInputElement>(null);
    // FIXME: Remove the comment when the new DateTimePicker will be ready
    //const [ value, setValue ] = React.useState<Date | null>(new Date());
    const val = props.value ?
        new Date(props.value || '').getTime() ? new Date(props.value).toISOString().slice(0, 16) : props.value : undefined;
    const defaultVal = props.initialDate ?
        new Date(props.initialDate || '').getTime() ? new Date(props.initialDate).toISOString().slice(0, 16) : props.initialDate : undefined;

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="datepicker-container d-flex position-relative">
                    <TextField
                        inputRef={pickerRef}
                        type="datetime-local"
                        className="datepicker-input nicecactus-input"
                        value={val ? val : undefined}
                        defaultValue={!val ? defaultVal : undefined}
                        label={props.label}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => { props.dateChanged(event.target.value); }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <div
                        className="icon"
                        style={{
                            maskImage: `url(${process.env.REACT_APP_S3_URL}/media/icons/calendar.svg)`,
                            WebkitMaskImage: `url(${process.env.REACT_APP_S3_URL}/media/icons/calendar.svg)`,
                        }}
                        onClick={() => {
                            pickerRef.current?.focus();
                            if ('showPicker' in HTMLInputElement.prototype) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                (pickerRef.current as any).showPicker();
                            }
                        }}
                    ></div>
                </div>
            </MuiThemeProvider>
            {/* FIXME: The new DateTimePicker will be part of new task. Added some hints at the top */}
            {/* <div className="datepicker-container d-flex position-relative mt-4">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                        renderInput={inputProps =>
                            <MuiTextField
                                {...inputProps}
                                type="datetime-local"
                                InputLabelProps={{ shrink: true }}
                            />
                        }
                        components={{ OpenPickerIcon: () =>
                            <Icon
                                icon={IconType.Calendar}
                                width={16}
                                height={16}
                            />
                        }}
                        label={props.label}
                        value={value}
                        onChange={(newValue) => {
                            props.dateChanged(newValue?.toISOString());
                            setValue(newValue);
                        }}
                    />
                </LocalizationProvider>
            </div> */}
        </React.Fragment>
    );
};
