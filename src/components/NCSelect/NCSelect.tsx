import { MuiThemeProvider } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import React, { ChangeEvent, useState } from 'react';
import { ThemePlatform } from '../../styles/Themes';

export interface SelectProps {
  id?: string;
  select?: { [key: string]: string };
  selectedField?: string | undefined;
  selectFields: Array<any>;
  orderSelectFields?: (a: any, b: any) => number
  fieldValue: string;
  fieldName: string;
  actionHook: (search: string | undefined) => any;
  defaultOptionLabel?: string;
  defaultOption?: {
    label: string,
    value?: any,
  };
}

export const NCSelect: React.FunctionComponent<SelectProps> = (props: SelectProps) => {
    const [ selectField, setSelectField ] = useState<string | undefined>('null');

    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative">
                    <Select
                        id={props.id}
                        native
                        value={props.selectedField || selectField}
                        className="w-100 nicecactus-input"
                        inputProps={{
                            name: props.fieldValue,
                            id: `select-${props.fieldValue}`,
                        }}
                        onChange={(
                            event: ChangeEvent<{ label?: string | undefined; value: unknown; }>
                        ) => {
                            const _v = event.target.value === 'null' ? undefined : event.target.value as string;
                            setSelectField(_v);
                            if (props.actionHook) {
                                props.actionHook(_v);
                            }
                        }}
                    >
                        {props.defaultOption && (
                            <option
                                id={props.id + '-select-menu-item-default'}
                                label={props.defaultOptionLabel || props.defaultOption.label}
                                key={'select-menu-item-default'}
                                value={props.defaultOptionLabel || props.defaultOption.value || 'null'}
                            >
                            </option>
                        )}
                        {props.selectFields.sort(props.orderSelectFields).map((key: any, index: number) => {
                            return (
                                <option
                                    id={'select-menu-item-' + index}
                                    label={key[props.fieldName]}
                                    key={index}
                                    value={key[props.fieldValue]}
                                >
                                    {key[props.fieldName]}
                                </option>
                            );
                        })}
                    </Select>
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
