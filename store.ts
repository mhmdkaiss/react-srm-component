import { action, Action, createContextStore, thunk } from "easy-peasy";

export type Messages = { [term: string]: string };

export type LoadMessagesFunction = (lang: string) => Promise<Messages>;

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
  updateLanguage: Action<ContextStoreModel, { language?: string, messages?: Messages }>;
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
      setLanguage: thunk<ContextStoreModel, string | undefined>(async (actions, lang = 'en', { getState }) => {
        actions.updateLanguage({
          language: lang,
          messages: await getState().loadMessages?.(lang),
        });
      }),
      updateLanguage: action<ContextStoreModel>((state, { language, messages }) => {
        state.language = language;
        state.messages = messages;
      }),
      loadMessages: async () => ({}),
      messages: {},
    }
);

export default ContextStore;
