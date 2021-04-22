import { createContextStore } from "easy-peasy";

export interface ContextStoreModel {
  getAccessToken: () => Promise<string | null>;
}

const ContextStore = createContextStore<ContextStoreModel>(
  (initialData) =>
    initialData || {
      getAccessToken: async () => {
        try {
          return localStorage.getItem("accessToken");
        } catch (e) {
          return null;
        }
      },
    }
);

export default ContextStore;
