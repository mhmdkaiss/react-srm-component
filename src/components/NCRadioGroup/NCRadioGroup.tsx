import React from 'react';
import {FormControlLabel, MuiThemeProvider, Radio, RadioGroup} from '@material-ui/core';
import {ThemePlatform} from '../../styles/Themes';

export interface NcRadioGroupFields {
    key: string,
    value: string,
    disabled?: boolean;
}

export interface NCRadioGroupProps {
    value: string;
    actionHook: (search: string) => any;
    fields: Array<NcRadioGroupFields>;
}

export const NCRadioGroup: React.FunctionComponent<NCRadioGroupProps> = ({
    value,
    actionHook,
    fields
}: NCRadioGroupProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative nicecactus-input">
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={(event) => {
                        actionHook(event.target.value as string)
                    }}>
                        <div className="d-flex flex-row">
                            {fields.map((field: any, index: number) => {
                                return (
                                    <FormControlLabel control={<Radio/>} value={field.value} label={field.key}
                                                      disabled={field.disabled} className="nc-radio"
                                                      id={"select-menu-item-" + index} key={index}/>
                                );
                            })}
                        </div>
                    </RadioGroup>
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
}
