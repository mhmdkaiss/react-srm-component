import React from 'react';
import { Icon, IconType } from '../..';
import './NCScrollTopButton.scss';

interface NCScrollTopButtonProps {
    size: number;
    actionHook: (clicked: boolean) => void;
}

export const NCScrollTopButton: React.FunctionComponent<NCScrollTopButtonProps> = (props: NCScrollTopButtonProps) => {
    return (
        <div
            className="scroll-top-button-container position-relative rounded-circle"
            style={{ width: `${props.size}px`, height: `${props.size}px` }}
            onClick={() => { props.actionHook(true); }}
        >
            <div className="circle high"></div>
            <div className="sliding">
                <Icon icon={IconType.GoToPreviousPage}/>
            </div>

            <div className="destination mt-2">
                <Icon icon={IconType.GoToPreviousPage}/>
            </div>
        </div>
    );
};
