# omnihorse website page

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run dev
```

#### Compiles and minifies for production

```
npm run build
```

#### directory structure

- assets    --style/contract abi/images files

- components    --pages components

- config       --website config file
  
  - dev.ts   -- npm run dev (use this file)
  
  - prod.ts  -- production(use this file)
  
  - themeSetting.ts  -- theme color configuration
  
  - http.interceptor.ts  -- all request interceptor
  
  - index.ts   -- include prod.ts and prod.ts

- connectors  -- wallet connectors

- locales   -- language internationalization file 

- pages  -- website single page

- router  -- router config

- services    -- all pages requests

- store  -- status manager

- types  -- object type

- utils
  
  - auth.js    -- token manager
  
  - chains.ts   -- all chain list
  
  - constant.ts   -- define const
  
  - rem.ts   -- font size adaptation
  
  - useContractTool.ts   -- all contract methods hook
  
  - useWallet.ts   -- wallet hook
  
  - useWeb3.ts -- web3 hook
  
  - utils.ts  -- common methods

- index.html   Google analyse  code set in
