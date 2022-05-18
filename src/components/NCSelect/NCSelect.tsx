import {
    Checkbox,
    Input,
    ListItemText,
    MenuItem,
    MenuProps,
    MuiThemeProvider,
    Select
} from '@material-ui/core';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import * as NCColors from '../../styles/NCColors';
import { ThemePlatform } from '../../styles/Themes';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MENU_DEFAULT_STYLE = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export type orderCallback<T> = (a: T, b: T) => number;

export interface SelectProps {
	id?: string;
	select?: { [key: string]: string };
	selectedField?: number | string | Array<string>;
	selectFields: Array<unknown>;
	fieldValue?: string;
	fieldName?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	orderSelectFields?: orderCallback<any>;
	actionHook: (v: string | undefined) => void;
	defaultOptionLabel?: string;
	defaultOption?: {
        label: string,
        value?: string | number,
    };
    disabled?: boolean,
    multiple?: boolean,
    menuProps?: Partial<MenuProps>,
    styleName?: string,
}

export const NCSelect: React.FunctionComponent<SelectProps> = (props: SelectProps) => {
    const [ selectField, setSelectField ] = useState<number | string | Array<string>>();
    const { id, multiple, selectFields, selectedField, fieldName, fieldValue } = props;
    const menuStyle = multiple
        ? (props.menuProps ? props.menuProps : MENU_DEFAULT_STYLE)
        : undefined;

    useEffect(() => {
        setSelectField(selectedField || selectField);
    }, [selectedField]);

    const isChecked = (value: string): boolean => {
        if (selectField && Array.isArray(selectField)) {
            return selectField.includes(value);
        }
        if (selectedField && Array.isArray(selectedField)) {
            return selectedField.includes(value);
        }
        return false;
    };

    return (
        <React.Fragment >
            <MuiThemeProvider theme={ThemePlatform}>
                <div className={`d-flex w-100 position-relative ${props.styleName}`}>
                    <Select
                        native={!multiple}
                        multiple={multiple}
                        disabled={props.disabled}
                        value={selectField || (multiple ? [] : '')}
                        className="w-100 nicecactus-input"
                        inputProps={{ name: props.id, id: `select-${id}` }}
                        onChange={(
                            event: ChangeEvent<{ label?: string; value: unknown; }>
                        ) => {
                            const v = event.target.value === 'null' ? undefined : event.target.value as string;
                            setSelectField(v);
                            props.actionHook(v);
                        }}
                        input={<Input />}
                        MenuProps={menuStyle}
                        renderValue={(selected: unknown): ReactNode => {
                            const selectedItmes = selected as [];
                            const listSelected =
                                    selectedItmes.length > 1
                                        ? selectedItmes.filter(opt =>
                                            selectFields.includes(opt))
                                        : selectedItmes;
                            return listSelected.join(', ');
                        }}
                    >
                        {multiple
                            ? (selectFields as Array<string>).map((value) =>
                                <MenuItem key={value} value={value}>
                                    <Checkbox
                                        style ={{ color: NCColors.nicecactus }}
                                        checked={isChecked(value)}
                                    />
                                    <ListItemText primary={value} />
                                </MenuItem>
                            )
                            : <React.Fragment>
                                {props.defaultOption && (
                                    <option
                                        key={`select-${id}-option-item-default`}
                                        id={`select-${id}-option-item-default`}
                                        label={props.defaultOptionLabel || props.defaultOption.label}
                                        value={props.defaultOptionLabel || props.defaultOption.value || 'null'}
                                    >
                                    </option>
                                )}
                                {selectFields.sort(props.orderSelectFields).map(
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (field: any, index: number) => {
                                        if (field) {
                                            const { name, value } = fieldName && fieldValue
                                                ? { name: field[fieldName], value: field[fieldValue] }
                                                : { name: field, value: field };
                                            const disabled = field.disable ? field.disable : false;
                                            return (
                                                <option
                                                    key={`select-${id}-option-${index}`}
                                                    id={`select-menu-item-${index}`}
                                                    disabled={disabled}
                                                    label={name}
                                                    value={value}
                                                >
                                                    {name}
                                                </option>
                                            );
                                        }
                                        return null;
                                    }
                                )}
                            </React.Fragment>
                        }
                    </Select>
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
};
