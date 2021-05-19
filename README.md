<p align="center">
  <img width="200" height="200" alt="SRM logo" title="SRM" src="https://user-images.githubusercontent.com/5578546/115530331-f63cbd00-a293-11eb-9174-722f0fa9b9d8.png">
</p>

# SRM <!-- omit in toc -->

Core library for Standalone React Module

[![NPM](https://img.shields.io/npm/v/@robingoupil/srm.svg)](https://www.npmjs.com/package/@robingoupil/srm)

- [How it works](#how-it-works)
- [Getting started](#getting-started)
- [Example](#example)
- [License](#license)

## How it works

SRM are react applications with extra perks. They can take props and mounted on a specific element. They are designed to be lazy or eagerly loaded into any other framework.

Building an SRM will produce several `.js` and `.css` files, all listed in the `asset-manifest.json` bundled along them.  
 The build folder content can then be served by a static server, keeping the folder structure and making sure all files are publicly accessible. A simple way to do so in production would be to use an [AWS S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html).

The `build/asset-manifest.json` file describes the entry points and assets to be fetched in order to use your SRM.  
 A direct url to this file will be required to load and run the SRM, as can be seen in [@robingoupil/ng-srm-wrapper](https://github.com/rgoupil/ng-srm-wrapper) or [@robingoupil/react-srm-wrapper](https://github.com/rgoupil/react-srm-wrapper).

##### Example for `https://your-domain.com`: <!-- omit in toc -->

```
+-- /
|   +-- your-project/
|       +-- asset-manifest.json
|       +-- favicon.ico
|       +-- index.html
|       +-- static/
```

Asset manifest URL: `https://your-domain.com/your-project/asset-manifest.json`

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

## Example

An example SRM with a custom store and i18n can be found in the [example](example) folder.  
Please see [example/README.md](example/README.md) for more details on how to run it.

## License

MIT © [rgoupil](https://github.com/rgoupil)
