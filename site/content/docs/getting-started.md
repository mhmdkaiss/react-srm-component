---
layout: docs
title: Getting Started
description: Get started with SRM
group: getting-started
aliases:
  - "/docs/getting-started/"
  - "/getting-started/"
toc: true
---

## Getting started

#### 1. Installation <!-- omit in toc -->

**yarn**

```bash
yarn add @robingoupil/srm
```

**npm**

```bash
npm install --save @robingoupil/srm
```

#### 2. Project setup <!-- omit in toc -->

You will need `react`, `react-dom` and `react-intl` as dependencies.

#### 3. CSS encapsulation (optionnal) <!-- omit in toc -->

The following section allows to prevent CSS leaking between the SRM and the host by prefixing all classes and styles. Please consider skipping this step if you don't need this feature as it will increase the bundle size.

_Note: we only provide steps for [CRA](https://github.com/facebook/create-react-app) at the moment, however it should be straight forward to adapt these instructions to any other bundling system._

##### 1) Install extra dependencies <!-- omit in toc -->

The following dev dependencies are required to customize the [CRA](https://github.com/facebook/create-react-app) build process without ejecting:

**yarn**

```bash
yarn add -D customize-cra prefix-css-loader react-app-rewired string-replace-loader
```

**npm**

```bash
npm install --save-dev customize-cra prefix-css-loader react-app-rewired string-replace-loader
```

##### 2) 'Flip' the existing calls to `react-scripts` in `npm` scripts for start, build and test <!-- omit in toc -->

##### package.json <!-- omit in toc -->
```diff
  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

Note: Do NOT flip the call for the `eject` script.
That gets run only once for a project, after which you are given full control over the webpack configuration making `react-app-rewired` no longer required.
There are no configuration options to rewire for the `eject` script.

##### 3) Copy the `config-overrides.js` from the example folder <!-- omit in toc -->

Copy the [config-overrides.js](example/config-overrides.js) to the root directory.

```
+-- your-project/
|   +-- config-overrides.js
|   +-- node_modules/
|   +-- package.json
|   +-- public/
|   +-- README.md
|   +-- src/
```

#### 4. SRM creation <!-- omit in toc -->

##### index.tsx <!-- omit in toc -->
```ts
/* Import the library */
import { SRM } from "@robingoupil/srm";

/* Create the SRM */
const orgName = 'myOrg';
const appName = 'myApp';

export interface Props {
  // Add Props to your SRM here
}

const render = SRM(
  `${orgName}.${appName}`,
  (props: Props) => {
    return (
      <>
        <span>Hello world 🏆</span>
      </>
    );
  }
);

/* Declare typings */
declare global {
  export interface Window {
    [orgName]: { [appName]: { render: typeof render } };
  }
}

/* Export render function */
export default render;
```

#### 5. Add i18n support (optionnal) <!-- omit in toc -->

<!-- TODO: split i18n into a dependency that need to be `yarn add`, it will expose the `language` and `loadMessages` props  -->

The last parameter `loadMessages` of the `SRM()` function can be used to return different dictionary based on the language set through the SRM props.  
It expects a function of the following signature: `(lang: string) => { [term: string]: string }` in order to fit your custom translation setup.  
For example, when using a different json file for each language:

```ts
const render = SRM(
  `${orgName}.${appName}`,
  ({ getUsername }: Props) => {
    ...
  },
  (lang: string) => require(`./translations/${lang}.json`) // require the json file from the translation folder
);
```
