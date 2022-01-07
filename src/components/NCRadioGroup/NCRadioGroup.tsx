import { FormControlLabel, MuiThemeProvider, Radio, RadioGroup } from '@material-ui/core';

import React from 'react';
import { ThemePlatform } from '../../styles/Themes';

export interface NcRadioGroupFields {
    key: string,
    value: string,
    disabled?: boolean;
}

export interface NCRadioGroupProps {
    value: string;
    fields: Array<NcRadioGroupFields>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionHook: (search: string) => any;
}

export const NCRadioGroup: React.FunctionComponent<NCRadioGroupProps> = (props: NCRadioGroupProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative nicecactus-input">
                    <RadioGroup aria-label="gender" name="gender1" value={props.value} onChange={(event) => {
                        props.actionHook(event.target.value as string);
                    }}>
                        <div className="d-flex flex-row flex-wrap">
                            {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                props.fields.map((field: any, index: number) => {
                                    return (
                                        <FormControlLabel control={<Radio/>} value={field.value} label={field.key}
                                            disabled={field.disabled} className="nc-radio"
                                            id={'select-menu-item-' + index} key={index}/>
                                    );
                                })
                            }
                        </div>
                    </RadioGroup>
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
