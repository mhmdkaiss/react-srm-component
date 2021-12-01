import './Dialog.scss';

import React from 'react';
import IconTimes from '../../styles/svg/IconTimes';

interface DialogProps {
    bodyComponent: React.ReactElement | React.FunctionComponent;
    headerComponent?: React.ReactElement | React.FunctionComponent;
    footerComponent?: React.ReactElement | React.FunctionComponent;
    show: boolean;
    setShow: (show: boolean) => void;
    noPadding?: boolean;
}

export const Dialog: React.FunctionComponent<DialogProps> = (props: DialogProps) => {
    const closeDialog = () => {
        props.setShow(false);
    };

    return (
        <div>
            {props.show === true && (
                <div
                    className="dialog"
                    data-testid="dialog"
                    onClick={() => closeDialog()}
                >
                    <div className={`dialog__content ${props.noPadding ? 'no-padding' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div className="dialog__content--background">
                            <div className="dialog__content--background--zone" />
                            <div className="dialog__content--background--overlay" />
                        </div>
                        <div
                            className="dialog__content--close"
                            onClick={() => {
                                props.setShow(false);
                            }}
                        >
                            <IconTimes />
                        </div>
                        { props.headerComponent &&
                            <div className="dialog__content--header">{props.headerComponent}</div>
                        }
                        <div className="dialog__content--bod">{props.bodyComponent}</div>
                        { props.footerComponent &&
                            <div className="dialog__content--footer">{props.footerComponent}</div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};
