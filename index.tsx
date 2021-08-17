import React, { memo, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'easy-peasy';
import { IntlProvider } from 'react-intl';
import _SRMStore, { ContextStoreModel, LoadMessagesFunction } from './store';
import { IEventEmiter } from './event';

export const SRMStore = _SRMStore;

declare var __webpack_public_path__: string;

let packg: { name: string };
try {
  packg = require('webapp__package.json');
} catch (e) {
  packg = { name: 'srm_testing' };
}

interface PropsMountSelector {
  selector: string;
  element?: null;
}

interface PropsMountElement {
  selector?: null;
  element: HTMLElement;
}

type PropsMount = PropsMountSelector | PropsMountElement;

interface PropsCommon {
  sendEvent?: (id: string, ...args: Array<any>) => Promise<any>;
  navigate: (
    commands: string | Array<string>,
    options?: { queryParams?: any }
  ) => any;
  loadMessages?: LoadMessagesFunction;
  basename?: string;
  publicPath?: string;
  language?: string;
  event?: any;
  eventEmiter?: IEventEmiter,
}

export type PropsSRM<T = void> = PropsMount & PropsCommon & T;
export type PropsApp = { [key: string]: any };

export type RenderFunction<Props extends PropsApp> = (
  props: Props
) => ReactElement;

export type SRMFunction<Props extends PropsApp> = (
  props: Props
) => any;

export function overrideModel<
  StoreModel extends Object = {},
  Key extends keyof StoreModel = any
>(
  store: Store<StoreModel, any>,
  key: Key,
  value: StoreModel[Key] | undefined | null
) {
  if (value != null) {
    store.removeModel(key as any);
    store.addModel(key as any, value as any);
  }
}

function exportSRM<Props extends PropsApp>(
  path: string,
  srm: SRMFunction<Props>
) {
  const out = path.split('.').reduce((obj, part) => {
    if (!obj[part]) {
      obj[part] = {};
    }

    return obj[part];
  }, window as any);

  Object.assign(out || {}, { render: srm });
}

/*
 * TODO: add callback array/EventListener like SRM.onContentRendered
 * to customize the rendering of the Content (e.g. add IntlProvider
 * and modify returned values).
*/

export function SRM<Props extends PropsApp>(
  path: string,
  render: RenderFunction<Props & { store: Store<ContextStoreModel, any> }>,
  loadMessages?: LoadMessagesFunction,
): SRMFunction<Props & PropsSRM & { store: Store<ContextStoreModel, any> }> {
  const srm: SRMFunction<Props & PropsSRM & { store: Store<ContextStoreModel, any> }> = (props) => {
    const {
      element,
      selector,
      basename,
      language,
      event,
      sendEvent,
      navigate,
      eventEmiter,
    } = props;

    let ret;
    const Content = memo(() => {
      const store = SRMStore.useStore();

      if (props.loadMessages || loadMessages) {
        overrideModel(store, 'loadMessages', props.loadMessages || loadMessages);
      }

      const { setBasename } = store.getActions();
      if (basename) {
        setBasename(basename);
      }

      const { setLanguage } = store.getActions();
      if (language) {
        setLanguage(language);
      } else {
        setLanguage('en');
      }

      if (sendEvent) {
        overrideModel(store, 'sendEvent', sendEvent);
      }

      if (navigate) {
        overrideModel(store, 'navigate', navigate);
      }

      if (eventEmiter) {
        overrideModel(store, 'eventEmiter', eventEmiter);
      }

      const { setEvent } = store.getActions();
      if (event) {
        setEvent(event);
      }

      ret = {
        setBasename,
        setLanguage,
        setEvent,
      };

      const { messages, language: locale } = store.getState();
      return (
        <IntlProvider locale={locale} messages={messages} defaultLocale="en">
          { render(Object.assign({}, props, store)) }
        </IntlProvider>
      );
    });

    const el = element || document.querySelector(selector || "#srm");
    ReactDOM.render(
      <div className={`__${packg.name}`}>
        <React.StrictMode>
          <SRMStore.Provider>
            <Content />
          </SRMStore.Provider>
        </React.StrictMode>
      </div>,
      el
    );

    return ret;
  };

  exportSRM(path, srm);

  return srm;
}

let publicPath = process.env.PUBLIC_URL;
if (!publicPath) {
  publicPath = '';
}

if (!publicPath.endsWith('/')) {
  publicPath += '/';
}

__webpack_public_path__ = publicPath;
