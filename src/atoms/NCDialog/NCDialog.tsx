import React from 'react';
import { TimesIcon } from '../../styles/svg';
import './NCDialog.scss';

export interface DialogProps {
    title?: string | React.ReactText | React.ReactChild;
    children: React.ReactNode;
    show: boolean;
    setShow: (show: boolean) => void;
    noPadding?: boolean;
    noHeader?: boolean;
    onClose?: (closed: string) => void;
    wildBody?: boolean;
}
export const NCDialog: React.FunctionComponent<DialogProps> = (props: DialogProps) => {
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
            onClick={() => closeDialog()}
        >
            <div
                className={`dialog-content ${props.noPadding ? 'no-padding' : ''}`}
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundImage: `url(${process.env.REACT_APP_S3_URL}/media/shared-library/background/dialog-background.png)` }}
            >
                {props.noHeader
                    ? <div
                        className="dialog-close-no-header d-flex"
                        onClick={() => closeDialog()}
                    >
                        <TimesIcon />
                    </div>
                    : <div className="dialog-header">
                        <div className="dialog-title">{props.title}</div>
                        <div
                            className="dialog-close"
                            onClick={() => closeDialog()}
                        >
                            <TimesIcon />
                        </div>
                    </div>
                }

                <div className={`dialog-body ${props.wildBody ? 'w-100 p-0' : ''}`}>{props.children}</div>
            </div>
        </div>
    );
};
