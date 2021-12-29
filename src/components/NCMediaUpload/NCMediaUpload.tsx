import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { NCDialog } from '../../atoms/NCDialog/NCDialog';
import { NCMediaLibrary } from '../../molecules';
import { Media } from '../../services/media-library.service';
import './NCMediaUpload.scss';

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

export const NCMediaUpload: React.FunctionComponent<NCMediaUploadProps> = (props: NCMediaUploadProps) => {
    const intl = useIntl();
    const [ previewImg, setPreviewImg ] = useState<string>();
    const [ errorMesg, setErrorMesg ] = useState<string>();

    const loadFile = (file: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
            const binaryStr = reader.result;
            if (binaryStr) {
                props.actionHook('blob', binaryStr.toString());
            }
        };
        reader.readAsDataURL(file);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onDrop = useCallback((files: any) => {
        files.forEach((file: Blob) => {
            loadFile(file);
        });
    }, []);

    const _dropzone = {
        onDrop,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onDropRejected: useCallback((e: any) => {
            const err = e[0].errors[0].message;
            setErrorMesg(`${err}`);
        }, []),
        accept: props.accept,
        minSize: props.minSize,
        maxSize: props.maxSize,
        maxFiles: 1,
        noClick: props.noClick,
        noDrag: props.noDrag,
        disabled: props.disabled,
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

    const previewBackground = `linear-gradient(rgb(36 36 36 / 70%), rgb(36 36 36 / 70%)), url("${previewImg}"), url("${props.currentImg}"), url("${props.currentImage}"), url("${props.defaultImg}")`;
    const style = {
        container: 'media-upload-container',
        zone: 'drop-zone',
        image: '',
    };
    if (props.zoneSize) {
        style.container += ` ${props.zoneSize}`;
    }
    if (isDragActive) {
        style.zone += ' dragable';
    }
    if (props.disabled) {
        style.zone += ' disabled';
    }
    if (!isDragActive) {
        console.log('style.image', previewBackground);
        style.image = previewBackground;
    }

    const [ MLOpen, setMLOpen ] = React.useState(false);

    const mediaSelected = (v: Media) => {
        props.actionHook('url', v.publicUrl);
        setPreviewImg(v.publicUrl);
        setMLOpen(false);
    };
    const getLibraryProps = () => {
        if (!props.mediaLibrary) {
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
                {props.labelImg && (<label>{props.labelImg}</label>)}
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
                        <span className="">{props.infoMsg || intl.formatMessage({
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
