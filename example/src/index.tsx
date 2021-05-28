import './index.css'

import React from 'react';
import { SRM, overrideModel } from "@nicecactus/srm";
import ContextStore from './store';
import App from './App'

import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';

const orgName = 'testing';
const appName = 'test';

export interface Props {
  getUsername(): string,
}

const render = SRM(
  `${orgName}.${appName}`,
  ({ getUsername }: Props) => {
    const Content = () => {
      const store = ContextStore.useStore();

      overrideModel(store, "getUsername", getUsername);

      return (
        <>
          <App />
        </>
      );
    };

    return (
      <ContextStore.Provider>
        <Content />
      </ContextStore.Provider>
    );
  },
  (lang: string) => require(`./_translations/${lang}.json`)
);

declare global {
  export interface Window {
    [orgName]: { [appName]: { render: typeof render } };
  }
}

export default render;
