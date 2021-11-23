import './NCMultiMediaUpload.scss';

import React from 'react';
import { ctxType, NCMediaUpload, NCMediaUploadProps } from '../NCMediaUpload/NCMediaUpload';

export interface NCMultiMediaUploadProps {
  images: Array<NCMediaUploadProps & { typeImg: string }>;
  actionHook: (type: string, ctx: ctxType, image: string) => void;
}

export const NCMultiMediaUpload: React.FunctionComponent<NCMultiMediaUploadProps> = ({ images, actionHook }) => {
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
                        />
                    );
                }))}
            </div>
        </React.Fragment>
    );
};
