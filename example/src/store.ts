import { createContextStore } from "easy-peasy";

export interface ContextStoreModel {
  getUsername: () => string;
}

const ContextStore = createContextStore<ContextStoreModel>(
  (initialData) =>
    initialData || {
      getUsername: () => {
        let user: any;
        try {
          user = JSON.parse(localStorage.getItem("user") || '{}');
        } catch {}

        return user?.name || 'Stranger';
      },
    }
);

export default ContextStore;
