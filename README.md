<p align="center">
  <img width="200" height="200" alt="SRM logo" title="SRM" src="https://user-images.githubusercontent.com/5578546/115530331-f63cbd00-a293-11eb-9174-722f0fa9b9d8.png">
</p>

# SRM

Core library for Standalone React Module

[![NPM](https://img.shields.io/npm/v/srm.svg)](https://www.npmjs.com/package/srm) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @robingoupil/srm
```

```bash
npm install --save @robingoupil/srm
```

## Usage

This example creates an SRM registered to `window.testing.test` with a custom store, using [easy-peasy](https://www.npmjs.com/package/easy-peasy).  
The host can pass its own implementation of `customMethod` when loading the SRM but not for `internalMethod`.

### index.tsx

```tsx
import './index.css'

import React from 'react';
import { SRM, overrideModel } from "@robingoupil/srm";
import ContextStore from './store';
import App from './App'

declare global {
  export interface Window {
    testing: { test: { render: typeof render } };
  }
}

export interface Props {
  customMethod(): Promise<string>,
}

const render = SRM(
  "testing.test",
  ({ customMethod }: Props) => {
    const Content = () => {
      const store = ContextStore.useStore();

      overrideModel(store, "customMethod", customMethod);

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
```

### store.ts

```ts
import { createContextStore } from "easy-peasy";

export interface ContextStoreModel {
  customMethod: () => Promise<string | null>;
}

const ContextStore = createContextStore<ContextStoreModel>(
  (initialData) =>
    initialData || {
      customMethod: async () => 'I can be changed by the host',
      internalMethod: async () => 'I will never change',
    }
);

export default ContextStore;
```

Building this SRM will produce several `.js` and `.css` files, all listed in the `asset-manifest.json`, bundled along them.  
The build folder content can then be served by a static server, keeping the folder structure and making sure all files are publicly accessible. A simple way to do so is by using an [AWS S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html).  

The `build/asset-manifest.json` file describes the entry points and assets to be fetched in order to use your SRM.  
A direct url to this file will be required to load and run the SRM, as can be seen in [@robingoupil/ng-srm-wrapper](https://github.com/rgoupil/ng-srm-wrapper) or [@robingoupil/react-srm-wrapper](https://github.com/rgoupil/react-srm-wrapper).  
_Example asset manifest URL: http://localhost:5000/bundle/testing/test/asset-manifest.json_

## License

MIT © [rgoupil](https://github.com/rgoupil)
