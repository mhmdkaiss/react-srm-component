import React, {useEffect, useState} from 'react';
import "./NCToast.scss";
import {Icon, IconType } from "../../index";
import {ToastModel, ToastPosition} from "../../models/NCToastModel";

export interface NCToastProps {
    toastList: Array<ToastModel>;
    position?: ToastPosition;
    duration?: number;
}

export const NCToast: React.FunctionComponent<NCToastProps> = ({toastList, position, duration }) => {
    const [list, setList] = useState<Array<ToastModel>>(toastList);

    useEffect(() => {
        setList([...toastList]);
        // eslint-disable-next-line
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, duration || 7000);

        return () => {
            clearInterval(interval)
        }
        // eslint-disable-next-line
    }, [toastList, list]);

    const deleteToast = (id: number) => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }

    return (
        <div className={`toast-container ${position}`}>
            {
                list.map((toast: ToastModel) => {
                    return (
                        <div key={toast.id} className={`toast ${position} ${toast.type ? toast.type : ''}`}>
                            <div className="toast-title d-flex flex-row justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                    <p className="my-auto">{toast.title}</p>
                                </div>
                                <div onClick={() => deleteToast(toast.id)}>
                                    <Icon
                                        styleName={'ml-2'}
                                        icon={IconType.Cross}
                                        width={13}
                                        height={13}
                                    />
                                </div>
                            </div>
                            <div className="toast-content">
                                <p>{toast.content}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}
