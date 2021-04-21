import { action, Action, createContextStore } from "easy-peasy";

export interface ContextStoreModel {
  sendEvent: (id: string, ...args: Array<any>) => Promise<any>;
  navigate: (
    commands: string | Array<string>,
    options?: { queryParams?: any }
  ) => any;
  basename: string;
  setBasename: Action<ContextStoreModel, string | undefined>;
  language: string;
  setLanguage: Action<ContextStoreModel, string | undefined>;
  messages: any;
}

const ContextStore = createContextStore<ContextStoreModel>(
  (initialData) =>
    initialData || {
      sendEvent: async () => {},
      navigate: () => {},
      basename: "/",
      setBasename: action<ContextStoreModel>((state, value) => {
        state.basename = value || "/";
      }),
      language: "en",
      setLanguage: action<ContextStoreModel>((state, value) => {
        state.language = value || "en";

        try {
          state.messages = require(`../_translations/${state.language}.json`);
        } catch {}
      }),
      messages: {},
    }
);

export default ContextStore;
