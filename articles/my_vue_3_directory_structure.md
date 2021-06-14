---
title: My Vue 3 Directory Structure
description: My Vue 3 Directory Structure for small, presonal projects
created: 2021-06-07
tags:
  - 'Vue'
---

Folowing directory structure is good for me, but I only do small, personal projects

```text
assets
└─ css
   ├─ app.css
   ├─ reset.css
   └─ variables.css

api
├─ api.js
└─ fetchWrapper.js

auth
└─ auth.js

components
└─ app
   ├─ AppHeader.vue
   ├─ AppFooter.vue
   └─ AppLoginModal.vue
└─ common
   ├─ Alert.vue
   ├─ Btn.vue
   ├─ Dialog.vue
   └─ Loader.vue
└─ layouts
   └─ BaseLayout.vue

composition
└─ fetchSomething.js

data
└─ constants.js

router
└─ router.js

typings
├─ ts-shim.d.ts
└─ types.d.ts

utils
└─ sleep.js

views
├─ About.vue
└─ Index.vue

App.vue

main.js
```

`~/api/api.js` - all back-end API in one place.

`~/api/fetchWrapper.js` - more info [here](/blog/fetch_api_wrapper)

`~/components` - project components

`~/components/app` - components present/available on every view

`~/components/common` - generic components / sort of own library

`~/views` - router views | pages

`~/data` - data reused in different places

```js
// ~/data/constants.js

export const ROUTES = {
	about: '/about',
	dashboard: '/dashboard',
	index: '/',
	user: '/user'
}

export const DEFAULT_ERROR = 'Something went wrong 👿'
```

So we get single source of truth, autocompletion and maybe error check

`~/router/router.js` and not `~/router/index.js` - in vscode, if I open a few files and 2+ of them are named the same (index.js), I can't tell right away which is witch. Plus it's easier to open a file without leaving the keyboard, just press `Ctrl+p` and type file name, `router`, and `router.js` will be first in the list.
