import {
    ChallengeResult,
    DatePicker,
    NCCheckbox,
    NCChip,
    NCColorPicker,
    NCInput,
    NCInputMultiple,
    NCMediaUpload,
    NCMultiSearch,
    NCParticipantCardList,
    NCPreviewSearch,
    NCPreviewSearchAsync,
    NCRadioGroup,
    NcRadioGroupFields,
    NCScrollTopButton,
    NCSelect,
    NCSelector,
    NCSwitch,
    NCTextArea,
    NCTimePicker,
    PlatformList,
    SearchBar
} from '@cactus/srm-component';
import React, { useState } from 'react';
import { NCInputMultipleKeys } from '../../../../src/components/NCInputMultiple/NCInputMultiple';
import { generateSearchResultWithName } from '../../mock/Inputs/Input.mock';

export const InputDemoPage: React.FunctionComponent = () => {
    // Scroll Top Button
    const scrollTop = (clicked: boolean) => {
        if (!clicked) {
            return;
        }
        window.scrollTo(0, 0);
    };

    // Toogles
    const [ switchChecked, setSwitchChecked ] = useState<boolean>();
    const [ chipChecked, setChipChecked ] = useState<boolean>();
    const [ chipDeleted, setChipDeleted ] = useState<boolean>();

    //Search Bars
    const searchList = [{ name: 'Item 1' }, { name: 'Item 2' }];
    const searchFiled = 'name';
    const [ selectedItem, setSelectedItem ] = useState<{ name: string }>(
        searchList[0]
    );
    const [ selectedItem2, setSelectedItem2 ] = useState<{ name: string }>();
    const [ searchSelected, setSearchSelected ] = useState<Array<string>>([]);
    const [ searchListLoading, setSearchListLoading ] = useState<boolean>(false);
    const [ asyncSearchList, setAsyncSearchList ] = useState<
        Array<{ name: string }>
    >([]);

    //Media uploader
    const [ bannerImage, setBannerImage ] = useState<string | null>(null);
    const [ updatedMedia, setUpdatedMedia ] = useState<{
        [key: string]: { previous?: string; value: string };
    }>({});

    const fakeAsyncCall = async (search: string) => {
        setSearchListLoading(true);
        await new Promise((res) => setTimeout(res, 500));
        if (search) {
            setAsyncSearchList(generateSearchResultWithName(search, 50));
        } else {
            setAsyncSearchList([]);
        }
        setSearchListLoading(false);
    };

    const handleMediaChange = (key: string, value: string) => {
        if (updatedMedia[key]) {
            updatedMedia[key].value = value;
        } else {
            updatedMedia[key] = { value };
        }
        setUpdatedMedia(JSON.parse(JSON.stringify(updatedMedia)));
    };

    // NCSelect
    const ncSelectValues = [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' },
        { key: 'key3', value: 'value3' },
    ];

    const multiSelectOptions = [ 'option1', 'option2', 'option3', 'option4', 'option5' ];

    const [ ruleGame, setRuleGame ] = useState<string>(ncSelectValues[0].value);
    const renderNcSelect = () => {
        return (
            <div className='my-3'>
                <h6 className='secondary-color-cool'>NC Select</h6>
                <p className='secondary-color-cool'>
                    Selected item: {ruleGame}
                </p>
                <NCSelect
                    selectFields={ncSelectValues}
                    fieldValue={'value'}
                    fieldName={'key'}
                    actionHook={(event) => {
                        if (typeof event === 'string') {
                            setRuleGame(event);
                        }
                    }}
                />
                <div className='pt-3'>
                    <NCSelect
                        selectedField={[ multiSelectOptions[0], multiSelectOptions[2] ]}
                        selectFields={multiSelectOptions}
                        multiple={true}
                        actionHook={(items) => console.log(items)}
                    />
                </div>
            </div>
        );
    };

    // NC Selector
    const ncSelectorValues = [
        { key: 'key1', value: 'value1', image: 'media/default/default-team-avatar.png' },
        { key: 'key2', value: 'value2', image: 'assets/nc-logo-small.png' },
        { key: 'key3', value: 'value3' },
    ];
    const [ selectorRuleGame, setSelectorRuleGame ] = useState<string>(ncSelectorValues[0].value);
    const renderNCSelector = () => {
        return (
            <div className='my-3'>
                <h6 className='secondary-color-cool'>NC Selector</h6>
                <p className='secondary-color-cool'>
                    Selected item: {selectorRuleGame}
                </p>
                <NCSelector
                    defaultOptionLabel={'Settings'}
                    selectFields={ncSelectorValues}
                    selectedField={'value1'}
                    fieldValue={'value'}
                    fieldName={'key'}
                    fieldImage={'image'}
                    actionHook={setSelectorRuleGame}
                    disabled={false}
                />
            </div>
        );
    };

    // NC ColorPicker
    const [ ncColorPickerValue, setNcColorPickerValue ] = useState<string>('#b2f617');
    const renterNCColorPicker = () => {
        return (
            <div className='my-3'>
                <h6 className='secondary-color-cool'>NC Color Picker</h6>
                <p className='secondary-color-cool'>
                    Color value : {ncColorPickerValue}
                </p>
                <div className="d-flex flex-row my-2">
                    <NCColorPicker
                        color={ncColorPickerValue}
                        actionHook={setNcColorPickerValue}
                    />
                </div>
                <div className="d-flex flex-row align-items-center my-2">
                    Hidden input :
                    <NCColorPicker
                        hideInput={true}
                        color={ncColorPickerValue}
                        actionHook={setNcColorPickerValue}
                    />
                </div>
                <div className="d-flex flex-row align-items-center my-2">
                    Disable transparency :
                    <NCColorPicker
                        color={ncColorPickerValue}
                        actionHook={setNcColorPickerValue}
                        disableAlpha={true}
                    />
                </div>
            </div>
        );
    };

    // NC TextArea
    const [ ncAreaValue, setNcAreaValue ] = useState<string>('Bonsoir ! ');
    const renderNCTextArea = () => {
        return (
            <div className='my-3'>
                <h6 className='secondary-color-cool'>NC TextArea</h6>
                <p className='secondary-color-cool'>
                    Selected item: {ncAreaValue}
                </p>
                <NCTextArea
                    value={ncAreaValue}
                    actionHook={setNcAreaValue}
                    placeHolder='Write something...'
                    minRows={3}
                    maxRows={5}
                />
            </div>
        );
    };

    // NC RadioGroup

    const ncRadioValues: Array<NcRadioGroupFields> = [
        { key: 'key1', value: 'value1', disabled: false },
        { key: 'key2', value: 'value2', disabled: false },
        { key: 'key3', value: 'value3', disabled: true },
    ];
    const [ ncRadioGroupValue, setNcRadioGroupValue ] = useState<string>(
        ncRadioValues[0].value
    );
    const renderNCRadioGroup = () => {
        return (
            <div className='my-3'>
                <h6 className='secondary-color-cool'>NC RadioGroup</h6>
                <p className='secondary-color-cool'>
                    Selected item: {ncRadioGroupValue}
                </p>
                <NCRadioGroup
                    value={ncRadioGroupValue}
                    actionHook={setNcRadioGroupValue}
                    fields={ncRadioValues}
                />
            </div>
        );
    };

    const platform = { id: 'pc',
        route: 'route',
        active: true,
        color: 'color',
        title: 'title',
        checked: false };

    const [ participantsCards, setParticipants ] = useState<Array<ChallengeResult>>([
        { id: 'testId1', username: 'test1', score: 2, media: '', route: '', date: '2022-01-01T00:00:00Z' },
        { id: 'testId2', username: 'test2', score: 5, media: '', route: '', date: '2022-01-01T00:00:00Z' },
        { id: 'testId3', username: 'test3', score: 3, media: '', route: '', date: '2022-01-01T00:00:00Z' },
        { id: 'testId4', username: 'test4', score: 100, media: '', route: '', date: '2022-01-01T00:00:00Z' },
        { id: 'testId5', username: 'test5', score: 1, media: '', route: '', date: '2022-01-01T00:00:00Z' },
        { id: 'testId6', username: 'test6', score: 7, media: '', route: '', date: '2022-01-01T00:00:00Z' },
        { id: 'testId7', username: 'test7', score: 3, media: '', route: '', date: '2022-01-01T00:00:00Z' },
        { id: 'testId8', username: 'test8', score: 10, media: '', route: '', date: '2022-01-01T00:00:00Z' },
        { id: 'testId9', username: 'test9', score: 1, media: '', route: '', date: '2022-01-01T00:00:00Z' },
    ]);

    const [ multipleInputs, setMultipleInputs ] = useState<Array<NCInputMultipleKeys>>([]);

    return (
        <div className='white'>
            <div>
                <h4>Text input</h4>
                <NCInput label='Label' value='Value' onChange={(e) => {
                    console.log('event', e);
                }} />
                <div className='w-100 my-5'>
                    <NCInputMultiple withMedia={true} list={multipleInputs} label='label' onChange={(e) => setMultipleInputs(e)}/>
                </div>
                {renderNCTextArea()}
                {renderNcSelect()}
                {renderNCSelector()}
            </div>

            <div className='my-5'>
                <h4>Color Picker</h4>
                {renterNCColorPicker()}
            </div>

            <div className='my-5'>
                <h4>Date picker</h4>
                <DatePicker
                    initialDate={''}
                    label='Date picker'
                    dateChanged={(e) => {
                        console.log('event', e);
                    }}
                />
                <div className='pt-4'>
                    <NCTimePicker
                        label='Time picker'
                        onChange={(time) => console.log('time', time)}
                    />
                </div>
            </div>
            <div className='my-5'>
                <h4>Search Bars</h4>
                <div>
                    <h6>Basic</h6>
                    <SearchBar
                        searchFields={{ search: { label: '' } }}
                        placeHolder='Place holder'
                        actionHook={(e) => {
                            console.log('event', e);
                        }}
                    />
                </div>

                <div className='my-4'>
                    <h6>Multi parameters (TO IMPROVE)</h6>
                    <SearchBar
                        searchFields={{
                            field1: { label: 'Label1' },
                            field2: { label: 'Label2' },
                            field3: { label: 'Label3' },
                        }}
                        placeHolder='Place holder'
                        actionHook={(e) => {
                            console.log('event', e);
                        }}
                    />
                </div>

                <div className='my-4'>
                    <h6>Select search</h6>
                    <div>
                        <div className='mb-1'>Place holder</div>
                        <NCPreviewSearch
                            searchFields={{
                                search: { label: 'Label1' },
                            }}
                            placeHolder='Place holder'
                            actionHook={(e) => {
                                console.log('event', e);
                            }}
                            list={[{ name: 'item1' }, { name: 'Item 2' }, { name: 'Item 2' }, { name: 'Item 2' }, { name: 'Item 2' }, { name: 'Item 2' }, { name: 'Item 2' }, { name: 'Item 2' }, { name: 'Item 2' }, { name: 'Item 2' }]}
                            displayParam='name'
                            onSelection={(e) => {
                                console.log(e);
                                setSelectedItem2(e);
                            }}
                            hideStore={false}
                            value={
                                selectedItem2 ? selectedItem2.name : undefined
                            }
                        />

                        <div className='mt-2 mb-1'>Default value</div>
                        <NCPreviewSearch
                            searchFields={{
                                search: { label: 'Label1' },
                            }}
                            actionHook={(e) => {
                                console.log(e);
                            }}
                            list={searchList}
                            displayParam='name'
                            hideStore={false}
                            onSelection={(e) => {
                                setSelectedItem(e);
                            }}
                            value={selectedItem.name}
                        />
                    </div>
                </div>

                <div className='my-4'>
                    <h6>Select search async</h6>
                    <div>
                        <div className='mb-1'>Place holder</div>
                        <NCPreviewSearchAsync
                            label='Place holder'
                            list={asyncSearchList}
                            displayParam='name'
                            onSelection={(e) => {
                                console.log(e);
                                setSelectedItem2(e);
                            }}
                            loading={searchListLoading}
                            onType={fakeAsyncCall}
                            noResultMessage='No results, try another name'
                        />

                        <div className='mt-2 mb-1'>Default value</div>
                        <NCPreviewSearch
                            searchFields={{
                                search: { label: 'Label1' },
                            }}
                            actionHook={(e) => {
                                console.log(e);
                            }}
                            list={searchList}
                            displayParam='name'
                            hideStore={false}
                            onSelection={(e) => {
                                setSelectedItem(e);
                            }}
                            value={selectedItem.name}
                        />
                    </div>
                </div>

                <div className='my-4'>
                    <h6>Mutliple Preview Search</h6>
                    <NCMultiSearch
                        searchFields={{
                            search: { label: 'Label1' },
                        }}
                        placeHolder='Place holder'
                        actionHook={(e) => {
                            console.log('event', e);
                        }}
                        list={searchList}
                        displayParam={searchFiled}
                        selected={searchSelected}
                        compareParam={searchFiled}
                        onSelection={(selected) => {
                            const item = searchList.find(
                                (item) =>
                                    item[searchFiled] === selected[searchFiled]
                            );
                            if (item) {
                                searchSelected.push(item[searchFiled]);
                                setSearchSelected([...searchSelected]);
                            }
                        }}
                        onDelete={(deleted) => {
                            setSearchSelected([
                                ...searchSelected.filter(
                                    (item) => item !== deleted[searchFiled]
                                ),
                            ]);
                        }}
                        hideStore={false}
                    />
                </div>
            </div>

            <div className='my-5'>
                <h4>Platform list</h4>
                <div>
                    <PlatformList
                        platforms={[ platform, platform ]}
                        onChange={ () => null }
                    />
                </div>
            </div>

            <span className="theme-title">Participants Card List</span>
            <div className='w-50'>
                <NCParticipantCardList list={participantsCards} triggerOnChange={() => setParticipants([...participantsCards])}/>
            </div>

            <div className='my-5'>
                <h4>Toogles</h4>

                <div className='my-4'>
                    <h6>Switch</h6>
                    <NCSwitch
                        checked={switchChecked}
                        onChange={(e) => setSwitchChecked(e)}
                    />
                </div>

                {renderNCRadioGroup()}

                <div className='my-4'>
                    <h6>Checkbox</h6>
                    <NCCheckbox
                        checked={switchChecked}
                        onChange={(e) => setSwitchChecked(e)}
                    />
                </div>

                <div className='my-4'>
                    <h6>Filter chip</h6>
                    <div className='d-flex'>
                        <NCChip
                            label='chip 1'
                            checked={chipChecked}
                            onChange={(e) => setChipChecked(e)}
                        />

                        <div className='mx-2'>
                            {!chipDeleted && (
                                <NCChip
                                    label='chip 1'
                                    deletion={true}
                                    onChange={(e) => setChipDeleted(e)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h6 className='secondary-color-cool'>Switch</h6>
                <NCSwitch
                    checked={switchChecked}
                    onChange={(e) => setSwitchChecked(e)}
                />
            </div>

            <div className='my-5'>
                <h4>Media uploader</h4>
                <div className='my-4'>
                    <NCMediaUpload
                        currentImage={
                            bannerImage ||
                            `${process.env.REACT_APP_S3_URL}/teams/medias/BannerImage`
                        }
                        defaultImg={`${process.env.REACT_APP_S3_URL}/media/default/default-team-banner.svg`}
                        actionHook={(image: string) => {
                            setBannerImage(image);
                            handleMediaChange('BannerImage', image);
                        }}
                    />
                </div>
            </div>

            <div className='my-5'>
                <h4>Scroll top button</h4>
                <div className='my-4'>
                    <NCScrollTopButton size={ 62 } actionHook={ scrollTop }/>
                </div>
            </div>

        </div>
    );
};
