import './NCDialog.scss';

import React from 'react';
import { TimesIcon } from '../../styles/svg';

export interface DialogProps {
    title?: string;
    children: React.ReactNode;
    show: boolean;
    setShow: (show: boolean) => void;
    noPadding?: boolean;
}

export const NCDialog: React.FunctionComponent<DialogProps> = ({
    title,
    children,
    show,
    setShow,
    noPadding,
}) => {
    if (show === false) {
        return null;
    }

    const closeDialog = () => {
        setShow(false);
    };

    return (
        <div
            className="nc-dialog"
            data-testid="nc-dialog"
            onClick={() => closeDialog()}
        >
            <div
                className={`dialog-content ${noPadding ? 'no-padding' : ''}`}
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundImage: `url(${process.env.REACT_APP_S3_URL}/media/shared-library/background/dialog-background.png)` }}
            >
                <div className="dialog-header">
                    <div className="dialog-title">{title}</div>
                    <div
                        className="dialog-close"
                        onClick={() => closeDialog()}
                    >
                        <TimesIcon />
                    </div>
                </div>
                <div className="dialog-body">{children}</div>
            </div>
        </div>
    );
};
