import { action, Action, createContextStore } from "easy-peasy";
import EventEmmiter, { IEventEmmiter } from "./event";

export type Messages = { [term: string]: string };

export type LoadMessagesFunction = (lang: string) => Messages;

export type Events = { [value: string]: any };
export type EventsSubscribe = { [value: string]: any };

export type ListenEventFunction = (data: any) => Events;

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
  eventEmmiter: IEventEmmiter;
  messages: Messages;
  setEvent: Action<ContextStoreModel, any | undefined>;
  event: any;
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
      event: {},
      eventEmmiter: new EventEmmiter(),
      setEvent: action<ContextStoreModel>((state, value) => {
        state.event = value;
        state.eventEmmiter.dispatch(state.event.type, state.event.data);
      }),
    }
);

export default ContextStore;
