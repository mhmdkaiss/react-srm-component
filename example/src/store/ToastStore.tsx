import { ToastModel } from "@cactus/srm-component";
import { action, Action } from "easy-peasy";

export interface ToastStore {
    list: Array<ToastModel>;
    pushToast: Action<ToastStore, ToastModel>;
    deleteToast: Action<ToastStore, number>;
    setToasts: Action<ToastStore, Array<ToastModel>>;
}

export const toastInitState: ToastStore = {
    list: [],
    pushToast: action((state, toast) => {
        state.list.push(toast);
    }),
    deleteToast: action((state, toastId) => {
        state.list = state.list.filter(t => t.id !== toastId);
    }),
    setToasts: action((state, toasts) => {
        state.list = toasts;
    })
};
