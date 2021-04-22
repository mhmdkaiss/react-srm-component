import { action, Action, createContextStore } from "easy-peasy";

export type Messages = { [term: string]: string };

export type LoadMessagesFunction = (lang: string) => Messages;

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
  loadMessages: LoadMessagesFunction;
  messages: Messages;
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
        state.messages = state.loadMessages?.(state.language);
      }),
      loadMessages: () => ({}),
      messages: {},
    }
);

export default ContextStore;
