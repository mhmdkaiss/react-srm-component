import React, { useState } from "react";
import { NCInput, DatePicker, SearchBar, NCSwitch, NCChip, NCPreviewSearch, NCMultiSearch, NCCheckbox } from "@cactus/srm-component";

export const InputDemoPage: React.FunctionComponent = () => {

    // Toogles
    const [switchChecked, setSwitchChecked] = useState<boolean>();
    const [chipChecked, setChipChecked] = useState<boolean>();
    const [chipDeleted, setChipDeleted] = useState<boolean>();

    //Search Bars
    const searchList = [{name: 'Item 1'}, {name: 'Item 2'}];
    const searchFiled = 'name';
    const [selectedItem, setSelectedItem] = useState<{name: string}>(searchList[0]);
    const [selectedItem2, setSelectedItem2] = useState<{name: string}>();
    const [searchSelected, setSearchSelected] = useState<Array<string>>([]);

    //Media uploader
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [updatedMedia, setUpdatedMedia] = useState<{ [key: string]: { previous?: File, value: File } }>({});

    const handleMediaChange = (key: string, value: File) => {
      if (updatedMedia[key]) {
        updatedMedia[key].value = value;
      } else {
        updatedMedia[key] = {value};
      }
      setUpdatedMedia(JSON.parse(JSON.stringify(updatedMedia)));
    }

    return (
        <div className="white">
            <div>
                <h4>Text input</h4>
                <NCInput label="Label" value="Value" onChange={() => {}} />
            </div>
            <div className="my-5">
                <h4>Date picker</h4>
                <DatePicker
                    initialDate={''}
                    label="Date picker"
                    dateChanged={() => {}}
                />
            </div>
            <div className="my-5">
                <h4>Search Bars</h4>
                <div>
                    <h6>Basic</h6>
                    <SearchBar
                        searchFields={{search: { label: "" }}}
                        placeHolder="Place holder"
                        actionHook={() => {}}
                    />
                </div>
                <div className="my-4">
                    <h6>Multi parameters (TO IMPROVE)</h6>
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
                <div className="my-4">
                    <h6>Select search</h6>
                    <div>
                        <div className="mb-1">Place holder</div>
                        <NCPreviewSearch
                            searchFields= {{
                                search: { label: 'Label1'},
                            }}
                            placeHolder="Place holder"
                            actionHook={() => {}}
                            list={[{ name: 'item1'}, { name: 'Item 2'}]}
                            displayParam="name"
                            onSelection={(e: any) => {console.log(e); setSelectedItem2(e)}}
                            hideStore={false}
                            value={selectedItem2 ? selectedItem2.name : undefined}
                        />

                        <div className="mt-2 mb-1">Default value</div>
                        <NCPreviewSearch
                            searchFields= {{
                                search: { label: 'Label1'},
                            }}
                            actionHook={(e) => {console.log(e)}}
                            list={searchList}
                            displayParam="name"
                            hideStore={false}
                            onSelection={(e) => {setSelectedItem(e)}}
                            value={selectedItem.name}
                        />
                    </div>
                </div>

                <div className="my-4">
                    <h6>Mutliple Preview Search</h6>
                    <NCMultiSearch
                        searchFields= {{
                            search: { label: 'Label1'},
                        }}
                        placeHolder="Place holder"
                        actionHook={() => {}}
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

            <div className="my-5">
                <h4>Media uploader</h4>
                <div className="my-4">
                    <NCMediaUpload
                        currentImage={bannerImage || `${process.env.REACT_APP_S3_URL}/teams/medias/BannerImage`}
                        defaultImg={`${process.env.REACT_APP_S3_URL}/media/default/default-team-banner.svg`}
                        actionHook={(image: File) => {
                            setBannerImage(image);
                            handleMediaChange('BannerImage', image);
                        }}
                    />
                </div>
            </div>

        </div>
    )
};
