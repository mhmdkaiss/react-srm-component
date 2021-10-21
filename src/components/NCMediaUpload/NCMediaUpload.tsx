import React, {ChangeEvent} from 'react';
import "./NCMediaUpload.scss"
import {Icon, IconType} from "../../atoms/Icon/Icon";

export interface NCMediaUploadProps {
  currentImage: string | File;
  defaultImg: string;
  actionHook: (image: File) => void;
}

export const NCMediaUpload: React.FunctionComponent<NCMediaUploadProps> = ({currentImage, defaultImg, actionHook}) => {

  const handleUploadClick = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event: any) => {
      actionHook(event.target.result.toString());
    };
    reader.readAsDataURL(file);
  };

  return (
    <React.Fragment>
      <div
        className="media-container background-fullsize w-100 h-100 p-4 text-center d-flex flex-column justify-content-center"
        style={{backgroundImage: 'linear-gradient(rgb(36 36 36 / 70%), rgb(36 36 36 / 70%)), ' + `url(${currentImage}), url(${defaultImg})`}}>
        <input className="media-input" accept="image/*" type="file" onChange={handleUploadClick}/>
        <div className="pb-3">drag and drop an image or click</div>
        <div className="mx-auto">
          <Icon icon={IconType.Cloud} height={64} width={64}/>
        </div>
      </div>
    </React.Fragment>
  );
}
