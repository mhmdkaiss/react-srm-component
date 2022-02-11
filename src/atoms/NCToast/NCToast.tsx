import React, { useEffect } from 'react';
import { ToastModel, ToastPosition } from '../../models/NCToastModel';
import { Icon, IconType } from '../Icon/Icon';
import './NCToast.scss';

export interface NCToastContainerProps {
    toast: ToastModel;
    position?: ToastPosition;
    duration: number;
    onDeleteToast: (toastId: number) => void;
}

export const NCToast: React.FunctionComponent<NCToastContainerProps> = (
    props
) => {
    const { toast, onDeleteToast } = props;

    useEffect(() => {
        const interval = setInterval(() => {
            onDeleteToast(toast.id);
        }, props.duration);

        if (toast.permanent) {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div
            className={`nc-toast-atom ${props.position}`+
                ` ${toast.type && toast.type}`+
                ` ${toast.style && toast.style}`
            }>
            <div className={'d-flex flex-row justify-content-between'}>
                <div className='d-flex flex-row align-items-center'>
                    {toast.titleIcon && toast.titleIcon}
                    <p className='toast-title my-auto'>{toast.title}</p>
                </div>
                <div className="clickable" onClick={() => onDeleteToast(toast.id)}>
                    <Icon
                        icon={IconType.Cross}
                        width={13}
                        height={13}
                        styleName={'ml-2'}
                    />
                </div>
            </div>
            <div className='toast-content'>
                <p>{toast.content}</p>
            </div>
        </div>
    );
};
