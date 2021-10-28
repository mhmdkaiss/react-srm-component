import {
    DatePicker,
    NCCheckbox,
    NCChip,
    NCInput,
    NCMediaUpload,
    NCMultiSearch,
    NCPreviewSearch,
    NCRadioGroup,
    NCSelect,
    NCStepper,
    NCSwitch,
    NCTextArea,
    NcRadioGroupFields,
    SearchBar,
} from "@cactus/srm-component";
import React, { useState } from "react";

export const InputDemoPage: React.FunctionComponent = () => {
    // Toogles
    const [switchChecked, setSwitchChecked] = useState<boolean>();
    const [chipChecked, setChipChecked] = useState<boolean>();
    const [chipDeleted, setChipDeleted] = useState<boolean>();

    //Search Bars
    const searchList = [{ name: 'Item 1' }, { name: 'Item 2' }];
    const searchFiled = 'name';
    const [selectedItem, setSelectedItem] = useState<{ name: string }>(searchList[0]);
    const [selectedItem2, setSelectedItem2] = useState<{ name: string }>();
    const [searchSelected, setSearchSelected] = useState<Array<string>>([]);

    //Media uploader
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [updatedMedia, setUpdatedMedia] = useState<{ [key: string]: { previous?: string, value: string } }>({});

    const handleMediaChange = (key: string, value: string) => {
        if (updatedMedia[key]) {
            updatedMedia[key].value = value;
        } else {
            updatedMedia[key] = { value };
        }
        setUpdatedMedia(JSON.parse(JSON.stringify(updatedMedia)));
    }

    const steps = ['Select team', 'Select players', 'Select captain'];
    const steps2 = steps.concat(['Select boss', 'Select legend']);
    const steps3 = steps2.concat(['Select demon', 'Select god']);

    const renderNcStepper = () => {
        return (
            <div className="my-3">
                <h6 className="secondary-color-cool">NC Stepper</h6>
                <div>
                    <div className="my-4">
                        <NCStepper
                            steps={2}
                            stepsLabel={steps}
                            activeStep={1}
                            error={false}
                        />
                    </div>
                    <div className="my-4">
                        <NCStepper
                            steps={4}
                            stepsLabel={steps}
                            activeStep={2}
                            error={true}
                        />
                    </div>
                    <div className="my-4">
                        <NCStepper
                            steps={6}
                            stepsLabel={steps2}
                            activeStep={4}
                            error={false}
                        />
                    </div>
                    <div className="my-4">
                        <NCStepper
                            steps={8}
                            stepsLabel={steps3}
                            activeStep={8}
                            error={false}
                        />
                    </div>
                </div>
            </div>
        )
    }

    // NCSelect
    const ncSelectValues = [
        { key: "key1", value: "value1" },
        { key: "key2", value: "value2" },
        { key: "key3", value: "value3" },
    ]
    const [ruleGame, setRuleGame] = useState<string>(ncSelectValues[0].value)
    const renderNcSelect = () => {
        return (
            <div className="my-3">
                <h6 className="secondary-color-cool">NC Select</h6>
                <p className="secondary-color-cool">Selected item: {ruleGame}</p>
                <NCSelect
                    selectFields={ncSelectValues}
                    fieldValue={"value"}
                    fieldName={"key"}
                    actionHook={setRuleGame}
                />
            </div>
        )
    }

    // NC TextArea
    const [ncAreaValue, setNcAreaValue] = useState<string>("Bonsoir ! ");
    const renderNCTextArea = () => {
        return (
            <div className="my-3">
                <h6 className="secondary-color-cool">NC TextArea</h6>
                <p className="secondary-color-cool">Selected item: {ncAreaValue}</p>
                <NCTextArea value={ncAreaValue} actionHook={setNcAreaValue} placeHolder="Write something..." minRows={3} maxRows={5} />
            </div>
        )
    }


    // NC RadioGroup

    const ncRadioValues: Array<NcRadioGroupFields> = [
        { key: "key1", value: "value1", disabled: false },
        { key: "key2", value: "value2", disabled: false },
        { key: "key3", value: "value3", disabled: true },
    ];
    const [ncRadioGroupValue, setNcRadioGroupValue] = useState<string>(ncRadioValues[0].value);
    const renderNCRadioGroup = () => {
        return (
            <div className="my-3">
                <h6 className="secondary-color-cool">NC RadioGroup</h6>
                <p className="secondary-color-cool">Selected item: {ncRadioGroupValue}</p>
                <NCRadioGroup value={ncRadioGroupValue} actionHook={setNcRadioGroupValue} fields={ncRadioValues} />
            </div>
        )
    }

    return (
        <div className="white">
            <div>
                <h4>Text input</h4>
                <NCInput label="Label" value="Value" onChange={() => {
                }} />

                {renderNCTextArea()}
                {renderNcSelect()}
                {renderNcStepper()}

            </div>
            <div className="my-5">
                <h4>Date picker</h4>
                <DatePicker
                    initialDate={''}
                    label="Date picker"
                    dateChanged={() => {
                    }}
                />
            </div>
            <div className="my-5">
                <h4>Search Bars</h4>
                <div>
                    <h6>Basic</h6>
                    <SearchBar
                        searchFields={{ search: { label: "" } }}
                        placeHolder="Place holder"
                        actionHook={() => {
                        }}
                    />
                </div>

                <div className="my-4">
                    <h6>Multi parameters (TO IMPROVE)</h6>
                    <SearchBar
                        searchFields={{
                            field1: { label: 'Label1' },
                            field2: { label: 'Label2' },
                            field3: { label: 'Label3' },
                        }}
                        placeHolder="Place holder"
                        actionHook={() => {
                        }}
                    />
                </div>

                <div className="my-4">
                    <h6>Select search</h6>
                    <div>
                        <div className="mb-1">Place holder</div>
                        <NCPreviewSearch
                            searchFields={{
                                search: { label: 'Label1' },
                            }}
                            placeHolder="Place holder"
                            actionHook={() => {
                            }}
                            list={[{ name: 'item1' }, { name: 'Item 2' }]}
                            displayParam="name"
                            onSelection={(e: any) => {
                                console.log(e);
                                setSelectedItem2(e)
                            }}
                            hideStore={false}
                            value={selectedItem2 ? selectedItem2.name : undefined}
                        />

                        <div className="mt-2 mb-1">Default value</div>
                        <NCPreviewSearch
                            searchFields={{
                                search: { label: 'Label1' },
                            }}
                            actionHook={(e) => {
                                console.log(e)
                            }}
                            list={searchList}
                            displayParam="name"
                            hideStore={false}
                            onSelection={(e) => {
                                setSelectedItem(e)
                            }}
                            value={selectedItem.name}
                        />
                    </div>
                </div>


                <div className="my-4">
                    <h6>Mutliple Preview Search</h6>
                    <NCMultiSearch
                        searchFields={{
                            search: { label: 'Label1' },
                        }}
                        placeHolder="Place holder"
                        actionHook={() => {
                        }}
                        list={searchList}
                        displayParam={searchFiled}
                        selected={searchSelected}
                        compareParam={searchFiled}
                        onSelection={(selected: any) => {
                            const item = searchList.find((item) => item[searchFiled] === selected[searchFiled]);
                            if (item) {
                                searchSelected.push(item[searchFiled]);
                                setSearchSelected([...searchSelected]);
                            }
                        }}
                        onDelete={(deleted: any) => {
                            setSearchSelected(
                                [...searchSelected.filter((item) => item !== deleted[searchFiled])]
                            );
                        }}
                        hideStore={false}
                    />
                </div>
            </div>


            <div className="my-5">
                <h4>Toogles</h4>

                <div className="my-4">
                    <h6>Switch</h6>
                    <NCSwitch
                        checked={switchChecked}
                        onChange={(e) => setSwitchChecked(e)}
                    />
                </div>

                {renderNCRadioGroup()}


                <div className="my-4">
                    <h6>Checkbox</h6>
                    <NCCheckbox
                        checked={switchChecked}
                        onChange={(e) => setSwitchChecked(e)}
                    />
                </div>

                <div className="my-4">
                    <h6>Filter chip</h6>
                    <div className="d-flex">
                        <NCChip
                            label="chip 1"
                            checked={chipChecked}
                            onChange={(e) => setChipChecked(e)}
                        />

                        <div className="mx-2">
                            {
                                !chipDeleted &&
                                <NCChip
                                    label="chip 1"
                                    deletion={true}
                                    onChange={(e) => setChipDeleted(e)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h6 className="secondary-color-cool">Switch</h6>
                <NCSwitch
                    checked={switchChecked}
                    onChange={(e) => setSwitchChecked(e)}
                />
            </div>

            <div className="my-5">
                <h4>Media uploader</h4>
                <div className="my-4">
                    <NCMediaUpload
                        currentImage={bannerImage || `${process.env.REACT_APP_S3_URL}/teams/medias/BannerImage`}
                        defaultImg={`${process.env.REACT_APP_S3_URL}/media/default/default-team-banner.svg`}
                        actionHook={(image: string) => {
                            setBannerImage(image);
                            handleMediaChange('BannerImage', image);
                        }}
                    />
                </div>
            </div>

        </div>
    )
};
