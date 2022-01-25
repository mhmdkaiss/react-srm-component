import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './NCDropZone.scss';

interface NCDropZoneProps {
    children?: React.ReactText | React.ReactChild | Array<React.ReactChild>,
    enableClick?: boolean;
    disabled?: boolean;
    actionHook: (files: Array<File>) => void;
    errorHook?: (e: string) => void;
}

export const NCDropZone: React.FunctionComponent<NCDropZoneProps & React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    actionHook,
    errorHook,
    enableClick,
    disabled,
    ...other
}) => {
    const style = {
        zone: '',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onDrop = useCallback((files: Array<File>) => {
        actionHook(files);
    }, []);

    const _dropzone = {
        onDrop,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onDropRejected: useCallback((e: any) => {
            const err = e[0].errors[0].message;
            if (errorHook) {
                errorHook(err);
            }
        }, [errorHook]),
        noClick: !enableClick,
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone(_dropzone);

    if (isDragActive || disabled) {
        style.zone = 'drop-zone';
    }

    if (isDragActive && !disabled) {
        style.zone += ' dragable';
    }

    if (disabled) {
        style.zone += ' disabled';
    }

    return (
        <div
            className={style.zone}
            {...getRootProps()}
            {...other}
        >
            <input accept="image/*" type="file" hidden {...getInputProps()} />
            {children}
        </div>
    );
};
