import { MuiThemeProvider } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import React, { ChangeEvent, useState } from "react";
import { ThemePlatform } from "../..";

export interface SelectProps {
  select?: { [key: string]: string };
  selectFields: Array<any>;
  fieldValue: string;
  fieldName: string;
  actionHook: (search: string) => any;
}
export const NCSelect: React.FunctionComponent<SelectProps> = (props: SelectProps) => {
  const [selectField, setSelectField] = useState<string>(props.selectFields && props.selectFields.length > 0 && props.selectFields[0][props.fieldValue]
  );
  return (
    <React.Fragment>
      <MuiThemeProvider theme={ThemePlatform}>
        <div className="d-flex w-100 position-relative">
          <Select
            native
            value={selectField}
            className="w-100 nicecactus-input"
            inputProps={{
              name: props.fieldValue,
              id: `select-${props.fieldValue}`,
            }}
            onChange={(
              event: ChangeEvent<{
                name?: string | undefined;
                value: unknown;
              }>
            ) => {
              setSelectField(event.target.value as string);
              if (props.actionHook) {
                props.actionHook(event.target.value as string);
              }
            }}
          >
              {props.selectFields.map((key: any, index: number) => {
                  return (
                      <option
                          id={"select-menu-item-" + index}
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
