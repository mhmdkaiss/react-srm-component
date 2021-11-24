import './NCMediaUpload.scss';

import React, { useCallback, useEffect, useState } from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { useDropzone } from 'react-dropzone';
import { Media } from '../../services/media-library.service';
import { NCDialog } from '../..';
import { NCMediaLibrary } from '../../molecules';
import { useIntl } from 'react-intl';

export type ctxType = 'url' | 'blob'
export interface NCMediaUploadProps {
    labelImg?: string;
    infoMsg?: string;
    // @deprecated
    currentImage?: string;
    currentImg?: string;
    defaultImg?: string;
    zoneSize?: 'small' | 'medium' | 'large';
    accept?: string | string[];
    minSize?: number;
    maxSize?: number;
    maxFiles?: number;
    noClick?: boolean;
    noDrag?: boolean;
    disabled?: boolean;
    actionHook: (ctx: ctxType, file: string) => void;
    mediaLibrary?: boolean;
}

export const NCMediaUpload: React.FunctionComponent<NCMediaUploadProps> = ({
    labelImg,
    infoMsg,
    currentImg,
    currentImage,
    defaultImg,
    actionHook,
    accept,
    minSize,
    maxSize,
    noClick,
    noDrag,
    disabled,
    zoneSize,
    mediaLibrary,
}) => {
    const intl = useIntl();
    const [ previewImg, setPreviewImg ] = useState<string>();
    const [ errorMesg, setErrorMesg ] = useState<string>();

    const loadFile = (file: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
            const binaryStr = reader.result;
            if (binaryStr) {
                actionHook('blob', binaryStr.toString());
            }
        };
        reader.readAsDataURL(file);
    };

    const onDrop = useCallback((files: any) => {
        files.forEach((file: Blob) => {
            loadFile(file);
        });
    }, []);

    const _dropzone = {
        onDrop,
        onDropRejected: useCallback((e: any) => {
            const err = e[0].errors[0].message;
            setErrorMesg(`${err}`);
        }, []),
        accept,
        minSize,
        maxSize,
        maxFiles: 1,
        noClick,
        noDrag,
        disabled,
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone(_dropzone);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useEffect(() => {
        console.log('errorMesg>', errorMesg);
    }, [errorMesg]);

    const previewBackground = `linear-gradient(rgb(36 36 36 / 70%), rgb(36 36 36 / 70%)), url("${previewImg}"), url("${currentImg}"), url("${currentImage}"), url("${defaultImg}")`;
    const style = {
        container: 'media-upload-container',
        zone: 'drop-zone',
        image: '',
    };
    if (zoneSize) {
        style.container += ` ${zoneSize}`;
    }
    if (isDragActive) {
        style.zone += ' dragable';
    }
    if (disabled) {
        style.zone += ' disabled';
    }
    if (!isDragActive) {
        console.log('style.image', previewBackground);
        style.image = previewBackground;
    }

    const [ MLOpen, setMLOpen ] = React.useState(false);

    const mediaSelected = (v: Media) => {
        actionHook('url', v.publicUrl);
        setPreviewImg(v.publicUrl);
        setMLOpen(false);
    };
    const getLibraryProps = () => {
        if (!mediaLibrary) {
            return {};
        }
        return {
            onClick: () => {
                setMLOpen(true);
            }
        };
    };

    return (
        <React.Fragment>
            <div className={style.container}>
                {labelImg && (<label>{labelImg}</label>)}
                <div
                    className={style.zone}
                    {...getRootProps()}
                    {...getLibraryProps()}
                >
                    <input accept="image/*" type="file" hidden {...getInputProps()} />
                    <div
                        className="image-zone"
                        style={{ backgroundImage: style.image }}
                    >
                        <span className="">{infoMsg || intl.formatMessage({
                            id: 'media-upload.info.message',
                        })}</span>
                        <Icon icon={IconType.Cloud} height={64} width={64} />
                        <span className="error-msg">{errorMesg}</span>
                    </div>
                </div>
            </div>

            <NCDialog show={MLOpen} setShow={setMLOpen}>
                <NCMediaLibrary actionHook={mediaSelected}></NCMediaLibrary>
            </NCDialog>
        </React.Fragment>
    );
};
