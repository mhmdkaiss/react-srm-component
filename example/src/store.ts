import { createContextStore } from 'easy-peasy';
import { toastInitState, ToastStore } from './store/ToastStore';

export interface ContextStoreModel {
  getUsername: () => string;
  toast: ToastStore;
}

const ContextStore = createContextStore<ContextStoreModel>(
    {
        getUsername: () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let user: any;
            try {
                user = JSON.parse(localStorage.getItem('user') || '{}');
            } catch {}

            return user?.name || 'Stranger';
        },
        toast: toastInitState
    }, {
        name: 'ds-example'
    }
);

export default ContextStore;
