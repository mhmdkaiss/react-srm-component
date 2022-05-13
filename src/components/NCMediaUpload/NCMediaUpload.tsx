import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { NCTypography } from '../../atoms';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import { NCDialog } from '../../atoms/NCDialog/NCDialog';
import { NCMediaLibrary } from '../../molecules';
import { Media } from '../../services/media-library.service';
import { NCInput } from '../NCInput/NCInput';
import './NCMediaUpload.scss';

export type ctxType = 'url' | 'blob'
export interface NCMediaUploadProps {
    labelImg?: string;
    infoMsg?: string;
    intlId?: string;
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
    s3PublicUrl?: string;
    noPreview?: boolean;
    inputMode?: boolean;
}

export const NCMediaUpload: React.FunctionComponent<NCMediaUploadProps> = (props: NCMediaUploadProps) => {
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
        style.image = previewBackground;
    }

    const [ MLOpen, setMLOpen ] = React.useState(false);

    const mediaSelected = (v: Media) => {
        props.actionHook('url', v.publicUrl);
        if (props.noPreview === false) {
            setPreviewImg(v.publicUrl);
        }
        setMLOpen(false);
    };
    const getLibraryProps = () => {
        if (!props.mediaLibrary || props.disabled) {
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
            <div
                className={style.container}
                hidden={props.inputMode}
            >
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
                        <NCTypography
                            intlID={props.intlId ?? 'media-upload.info.message'}
                        >
                            {props.infoMsg}
                        </NCTypography>
                        <Icon icon={IconType.Cloud} height={64} width={64} />
                        <span className="error-msg">{errorMesg}</span>
                    </div>
                </div>
            </div>
            {props.inputMode === true && (
                <div {...getLibraryProps()} className='w-100'>
                    <NCInput value={previewImg || props.currentImg || ''} onChange={() => {return;}} iconType='clip' disabled />
                </div>
            )}

            <NCDialog show={MLOpen} setShow={setMLOpen}>
                <NCMediaLibrary s3PublicUrl={props.s3PublicUrl} actionHook={mediaSelected}></NCMediaLibrary>
            </NCDialog>
        </React.Fragment>
    );
};
