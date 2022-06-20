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

const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT = 'YYYY-MM-DD';

export enum PickerType {
    DATETIME = 'datetime-local',
    DATE = 'date',
}

export interface DatePickerProps {
    label?: string;
    value?: string | number;
    initialValue?: string | number;
    dateChanged: (timestamp: number) => void;
    withoutTime?: boolean;
}

export const DatePicker: React.FunctionComponent<DatePickerProps> = (props: DatePickerProps) => {
    const pickerRef = useRef<HTMLInputElement>(null);

    const val = props.value && !props.withoutTime ? moment(props.value).format(DATETIME_FORMAT) : moment(props.value).format(DATE_FORMAT);
    const defaultVal = props.initialValue && !props.withoutTime ? moment(props.initialValue).format(DATETIME_FORMAT) : moment(props.initialValue).format(DATE_FORMAT);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (moment(Date.now()).unix() > moment(event.target.value).unix() || !props.withoutTime) {
            props.dateChanged( moment(event.target.value).valueOf());
        }
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
                        type={`${ !props.withoutTime ? PickerType.DATETIME : PickerType.DATE }`}
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
