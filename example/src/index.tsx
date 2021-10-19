import './index.scss';

import React from 'react';
import ContextStore from './store';
import App from './App'
import { SRM } from "@nicecactus/srm";

import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';

const orgName = 'testing';
const appName = 'test';

const render = SRM(
  `${orgName}.${appName}`,
  () => {
    const Content = () => {

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
