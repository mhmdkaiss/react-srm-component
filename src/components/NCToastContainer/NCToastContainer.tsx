import React, {useEffect, useState} from 'react';
import "./NCToastContainer.scss";
import {ToastModel, ToastPosition} from "../../models/NCToastModel";
import {NCToast} from "../../atoms/NCToast/NCToast";

export interface NCToastContainerProps {
    toastList: Array<ToastModel>;
    position?: ToastPosition;
    duration?: number;
    onDeleteToast: (toastId: number) => void;
}

export const NCToastContainer: React.FunctionComponent<NCToastContainerProps> = ({toastList, position, duration, onDeleteToast }) => {
    const [list, setList] = useState<Array<ToastModel>>(toastList);

    useEffect(() => {
        setList([...toastList]);
        // eslint-disable-next-line
    }, [toastList]);

    const deleteToast = (id: number) => {
        if(onDeleteToast) {
            onDeleteToast(id);
        }
    }

    return (
        <div className={`nc-toast-container-component ${position}`}>
            {
                list.map((toast: ToastModel) => {
                    return (
                        <NCToast key={toast.id} toast={toast} position={position} duration={duration || 7000} onDeleteToast={deleteToast} />
                    )
                })
            }
        </div>
    );
}
