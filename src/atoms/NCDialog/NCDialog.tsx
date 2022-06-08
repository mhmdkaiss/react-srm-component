import './NCDialog.scss';

import React from 'react';
import { TimesIcon } from '../../styles/svg';

export interface Position {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

export interface DialogProps {
    title?: string | React.ReactText | React.ReactChild;
    children: React.ReactNode;
    show: boolean;
    setShow: (show: boolean) => void;
    noPadding?: boolean;
    noHeader?: boolean;
    noClose?: boolean;
    onClose?: (closed: string) => void;
    wildBody?: boolean;
    position?: Position;
}
export const NCDialog: React.FunctionComponent<DialogProps> = (props: DialogProps) => {
    const defaultPosition = { top: 0, right: 0, bottom: 0, left: 0 };

    if (props.show === false) {
        return null;
    }

    const closeDialog = () => {
        props.setShow(false);
    };

    return (
        <div
            className="nc-dialog"
            data-testid="nc-dialog"
            onClick={() => !props.noClose && closeDialog()}
            style={ props.position ? props.position : defaultPosition }
        >
            <div
                className={`dialog-content ${props.noPadding ? 'no-padding' : ''}`}
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundImage: `url(${process.env.REACT_APP_S3_URL}/media/shared-library/background/dialog-background.png)` }}
            >
                {!props.noHeader &&
                    <div className="dialog-header">
                        <div className="dialog-title">{props.title}</div>
                        {
                            !props.noClose &&
                            <div
                                className="dialog-close"
                                onClick={() => closeDialog()}
                            >
                                <TimesIcon />
                            </div>
                        }
                    </div>
                }

                <div className={`dialog-body ${props.wildBody ? 'w-100 p-0' : ''}`}>{props.children}</div>
            </div>
        </div>
    );
};
