import React, { useEffect, useState } from 'react';
import { NCToast } from '../../atoms/NCToast/NCToast';
import { ToastModel, ToastPosition } from '../../models/NCToastModel';
import './NCToastContainer.scss';

export interface NCToastContainerProps {
    toastList: Array<ToastModel>;
    position?: ToastPosition;
    duration?: number;
    onDeleteToast: (toastId: number) => void;
}

export const NCToastContainer: React.FunctionComponent<NCToastContainerProps> = ({
    toastList,
    position,
    duration,
    onDeleteToast
}) => {
    const [ list, setList ] = useState<Array<ToastModel>>();

    useEffect(() => {
        setList(toastList);
    }, [toastList]);

    const deleteToast = (id: number) => onDeleteToast(id);

    return (
        <div className={`nc-toast-container-component ${position}`}>
            {list?.map((toast: ToastModel) => {
                return (
                    <NCToast
                        key={toast.id}
                        toast={toast}
                        position={position}
                        duration={duration || 7000}
                        onDeleteToast={deleteToast}
                    />
                );
            })}
        </div>
    );
};
