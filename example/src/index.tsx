import './index.css'

import React from 'react';
import { SRM, overrideModel } from "@robingoupil/srm";
import ContextStore from './store';
import App from './App'

declare global {
  export interface Window {
    nicecactus: { wallet: { render: typeof render } };
  }
}

export interface Props {
  getAccessToken(): Promise<string>,
}

const render = SRM(
  "testing.test",
  ({ getAccessToken }: Props) => {
    const Content = () => {
      const store = ContextStore.useStore();

      overrideModel(store, "getAccessToken", getAccessToken);

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
  }
);

export default render;
