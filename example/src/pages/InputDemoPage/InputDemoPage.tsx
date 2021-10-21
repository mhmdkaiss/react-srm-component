import React, { useState } from "react";
import { NCInput, DatePicker, SearchBar, NCSwitch, NCChip } from "@cactus/srm-component";
import "./InputDemoPage.scss"

export const InputDemoPage: React.FunctionComponent = () => {
    const [switchChecked, setSwitchChecked] = useState<boolean>();
    const [chipChecked, setChipChecked] = useState<boolean>();


    return (
        <div className="d-flex flex-column demo-container">
            <div>
                <h6 className="secondary-color-cool">Input</h6>
                <NCInput label="Label" value="Value" />
            </div>
            <div>
                <h6 className="secondary-color-cool">Date picker</h6>
                <DatePicker
                    initialDate={''}
                    label="Date picker"
                    dateChanged={() => {}}
                />
            </div>
            <div>
                <h6 className="secondary-color-cool">Search bar</h6>
                <SearchBar
                    searchFields={{search: { label: "" }}}
                    placeHolder="Place holder"
                    actionHook={() => {}}
                />
                <SearchBar
                    searchFields= {{
                        field1: { label: 'Label1'},
                        field2: { label: 'Label2'},
                        field3: { label: 'Label3' },
                    }}
                    placeHolder="Place holder"
                    actionHook={() => {}}
                />
            </div>

            <div>
                <h6 className="secondary-color-cool">Switch</h6>
                <NCSwitch
                    checked={switchChecked}
                    onChange={(e) => setSwitchChecked(e)}
                />
            </div>

            <div>
                <h6 className="secondary-color-cool">Filter chip</h6>
                <NCChip
                    label="chip 1"
                    checked={chipChecked}
                    onChange={(e) => setChipChecked(e)}
                />
            </div>
        </div>
    )
};
