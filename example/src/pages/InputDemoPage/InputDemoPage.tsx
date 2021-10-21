import React, {useState} from "react";
import {
  NCInput,
  DatePicker,
  SearchBar,
  NCSwitch,
  NCChip,
  NCMediaUpload
} from "@cactus/srm-component";
import "./InputDemoPage.scss"

export const InputDemoPage: React.FunctionComponent = () => {
  const [switchChecked, setSwitchChecked] = useState<boolean>();
  const [chipChecked, setChipChecked] = useState<boolean>();

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
    <div className="d-flex flex-column demo-container">
      <div>
        <h6 className="secondary-color-cool">Input</h6>
        <NCInput label="Label" value="Value"/>
      </div>
      <div>
        <h6 className="secondary-color-cool">Date picker</h6>
        <DatePicker
          initialDate={''}
          label="Date picker"
          dateChanged={() => {
          }}
        />
      </div>
      <div>
        <h6 className="secondary-color-cool">Search bar</h6>
        <SearchBar
          searchFields={{search: {label: ""}}}
          placeHolder="Place holder"
          actionHook={() => {
          }}
        />
        <SearchBar
          searchFields={{
            field1: {label: 'Label1'},
            field2: {label: 'Label2'},
            field3: {label: 'Label3'},
          }}
          placeHolder="Place holder"
          actionHook={() => {
          }}
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

      <div>
        <h6 className="secondary-color-cool">Media upload</h6>
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
  )
};
