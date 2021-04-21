import React, { ReactElement } from "react";
import * as packg from "./package.json";
import { Store } from "easy-peasy";
import ReactDOM from "react-dom";
import _SRMStore, { ContextStoreModel } from "./store";

import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";

export const SRMStore = _SRMStore;

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
  basename?: string;
  language?: string;
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
  const out = path.split(".").reduce((obj, part) => {
    if (!obj[part]) {
      obj[part] = {};
    }

    return obj[part];
  }, window as any);

  Object.assign(out || {}, { render: srm });
}


export function SRM<Props extends PropsApp>(
  path: string,
  render: RenderFunction<Props & { store: Store<ContextStoreModel, any> }>
): SRMFunction<Props & { store: Store<ContextStoreModel, any> }> {
  const srm: SRMFunction<Props & { store: Store<ContextStoreModel, any> }> = (props) => {
    const {
      element,
      selector,
      basename,
      language,
      sendEvent,
      navigate,
    } = props;

    let ret = {};
    const Content = () => {
      const store = _SRMStore.useStore();

      const { setBasename } = store.getActions();
      if (basename) {
        setBasename(basename);
      }

      const { setLanguage } = store.getActions();
      if (language) {
        setLanguage(language);
      } else {
        setLanguage("en");
      }

      overrideModel(store, "sendEvent", sendEvent);
      overrideModel(store, "navigate", navigate);

      ret = {
        setBasename,
        setLanguage,
      };

      return render({ ...props, store });
    };

    const el = element || document.querySelector(selector || "#srm");
    ReactDOM.render(
      <div className={`__${packg.name}`}>
        <React.StrictMode>
          <_SRMStore.Provider>
            <Content />
          </_SRMStore.Provider>
        </React.StrictMode>
      </div>,
      el
    );

    return ret;
  };

  exportSRM(path, srm);

  return srm;
}

export default SRM;
