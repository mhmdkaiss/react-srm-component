import './NCMultiMediaUpload.scss';

import React from 'react';
import { ctxType, NCMediaUpload, NCMediaUploadProps } from '../NCMediaUpload/NCMediaUpload';

export interface NCMultiMediaUploadProps {
  s3PublicUrl: string;
  images: Array<NCMediaUploadProps & { typeImg: string }>;
  actionHook: (type: string, ctx: ctxType, image: string) => void;
}

export const NCMultiMediaUpload: React.FunctionComponent<NCMultiMediaUploadProps> = ({ s3PublicUrl, images, actionHook }) => {
    return (
        <React.Fragment>
            <div className="multi-media-upload-container">
                {(images.map((ic, idx) => {
                    return (
                        <NCMediaUpload
                            key={idx}
                            labelImg={ic.labelImg}
                            currentImg={ic.currentImg}
                            disabled={ic.disabled}
                            maxSize={ic.maxSize}
                            zoneSize={ic.zoneSize}
                            noDrag={ic.noDrag}
                            noClick={ic.noClick}
                            mediaLibrary={ic.mediaLibrary}
                            actionHook={(t, img) => {
                                actionHook(ic.typeImg, t, img);
                            }}
                            s3PublicUrl={s3PublicUrl}
                        />
                    );
                }))}
            </div>
        </React.Fragment>
    );
};
