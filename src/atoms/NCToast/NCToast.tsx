import React, { useEffect } from 'react';
import './NCToast.scss';
import { Icon, IconType } from '../Icon/Icon';
import { ToastModel, ToastPosition } from '../../models/NCToastModel';

export interface NCToastContainerProps {
    toast: ToastModel;
    position?: ToastPosition;
    duration: number;
    onDeleteToast: (toastId: number) => void;
}

export const NCToast: React.FunctionComponent<NCToastContainerProps> = (
    props
) => {
    useEffect(() => {
        const interval = setInterval(() => {
            props.onDeleteToast(props.toast.id);
        }, props.duration);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div
            className={`nc-toast-atom ${props.position} ${
                props.toast.type ? props.toast.type : ''
            }`}
        >
            <div className='toast-title d-flex flex-row justify-content-between'>
                <div className='d-flex flex-row align-items-center'>
                    <p className='my-auto'>{props.toast.title}</p>
                </div>
                <div onClick={() => props.onDeleteToast(props.toast.id)}>
                    <Icon
                        styleName={'ml-2'}
                        icon={IconType.Cross}
                        width={13}
                        height={13}
                    />
                </div>
            </div>
            <div className='toast-content'>
                <p>{props.toast.content}</p>
            </div>
        </div>
    );
};
