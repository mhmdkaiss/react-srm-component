import { MuiThemeProvider } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import React, { ChangeEvent, useState } from 'react';
import { ThemePlatform } from '../../styles/Themes';

export interface SelectProps {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	id?: string;
	select?: { [key: string]: string };
	selectedField?: string | undefined;
	selectFields: Array<any>;
	fieldValue?: string;
	fieldName?: string;
	orderSelectFields?: (a: any, b: any) => number
	actionHook: (search: string | undefined) => any;
	defaultOptionLabel?: string;
	defaultOption?: {
		label: string,
		value?: any,
	};
    disabled?: boolean,
}

export const NCSelect: React.FunctionComponent<SelectProps> = (props: SelectProps) => {
    const [ selectField, setSelectField ] = useState<string | undefined>();
    const { fieldName, fieldValue } = props;
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="d-flex w-100 position-relative">
                    <Select
                        id={props.id}
                        native
                        disabled={props.disabled}
                        value={selectField || props.selectedField}
                        className="w-100 nicecactus-input"
                        inputProps={{
                            name: props.id,
                            id: `select-${props.id}`,
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
                        {props.selectFields.sort(props.orderSelectFields).map(
                            (field: any, index: number) => {
                                const { name, value } = fieldName && fieldValue
                                    ? { name: field[fieldName], value: field[fieldValue] }
                                    : { name: field, value: field };
                                return (
                                    <option
                                        key={index}
                                        id={`select-menu-item-${index}`}
                                        disabled={field.disabled}
                                        label={name}
                                        value={value}
                                    >
                                        {name}
                                    </option>
                                );
                            })}
                    </Select>
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
