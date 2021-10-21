## How to develop new component in this project ##

1. Clone project
2. In project directory run 
```
yarn
yarn build:watch
```
3. In new terminal go to example folder and run
```
yarn
yarn start
```
4. If it doesn't exist inside example folder add new demo page for your component

## How to use local version of this project in another project ##

1. Clone project
2. In project directory run 
```
yarn build:watch
yarn link
```
3. Go to another project and run
```
yarn link "@cactus/srm-component"
yarn start
```

### Potential issues ###

#### Error: [React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. ####
In index.tsx of another project wrap  <Content /> with 
```

import messages_en from '../src/_translations/en.json';
import { IntlProvider } from "react-intl";
    ...
<IntlProvider locale={"en"} messages={messages_en} defaultLocale={"en"}>
  <Content />
</IntlProvider>
```

#### Error: Invalid hook call. Hooks can only be called inside of the body... ####
In shared project run
```
npm link ../webapp-tournament/node_modules/react // this should be path ro react module in project in which you use shared lib
yarn build:all

```
