---
title: Vue 3 Firebase Auth
description: Vue 3 Firebase Authentication (SDK v9) with Vue-Router
created: 2021-06-08
tags:
  - 'Vue'
  - 'Firebase'
---

Work in progress.

Install Vue Router & Firebase

```shell
npm install vue-router@4
npm install firebase@9.0.0-beta.2
```

Initialize Vue Router and register routes

```js
/* ~src/router/router.js */

import { createRouter, createWebHistory } from 'vue-router';

import Index from '../views/Index.vue';
import About from '../views/About.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
	{ path: '/', component: Index },
	{ path: '/about', component: About },
	{
		path: '/dashboard',
		component: Dashboard,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}

		return { top: 0, left: 0 };
	},
});

export default router;
```

Initialize Firebase

```js
/* ~/src/initFirebase.js */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/* replace config */
const firebaseConfig = {
	apiKey: 'AIzaSyDOCAbC123dEf456GhI789jKl01-MnO',
	authDomain: 'myapp-project-123.firebaseapp.com',
	databaseURL: 'https://myapp-project-123.firebaseio.com',
	projectId: 'myapp-project-123',
	storageBucket: 'myapp-project-123.appspot.com',
	messagingSenderId: '65211879809',
	appId: '1:65211879909:web:3ae38ef1cdcb2e01fe5f0c',
	measurementId: 'G-8GSGZQ44ST',
};

const firebaseApp = initializeApp(firebaseConfig);

const Auth = getAuth(firebaseApp);

export { Auth };
```

Manage auth

```js
/* ~/src/auth/auth.js */

import { Auth } from '../initFirebase.js';
import { getIdTokenResult } from 'firebase/auth';
import api from '../api/api.js';

/**
 * @param {import('firebase/auth').User} firebaseUser
 */
export async function getUserData(firebaseUser) {
	// console.log({ firebaseUser })
	const { photoURL, displayName } = firebaseUser;

	const idTokenResult = await getIdTokenResult(firebaseUser);
	let { userID } = idTokenResult?.claims; // undefined if new user

	if (!userID) {
		userID = await createNewUser(firebaseUser);
	} else {
		// Fetch additional data from the server, smt like
		// const { body: userRecord } = await api.users.find(userID)
		// then theck if displayName and/or photoURL have changed
		// and proceed accordingly
	}

	const user = {
		displayName,
		photoURL,
		userID,
	};

	return user;
}

async function createNewUser({ photoURL, displayName }) {
	// Call the back-end to insert a new user record in DB
	// and assign a custom claim “userID” to the newly created user
	let userID;
	try {
		const { status, body } = await api.users.create({ photoURL, displayName });
		// console.log({ status, body })
		userID = body.userID;
	} catch (error) {
		console.error(error);
	}

	return userID;
}
```

Sign In

```js
/* ~/src/auth/signIn.js */

import { Auth } from '../initFirebase.js';
import {
	GoogleAuthProvider,
	signInWithRedirect,
	signInWithPopup,
	useDeviceLanguage,
} from 'firebase/auth';

export async function signIn() {
	const re = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	const isMobile = re.test(navigator.userAgent);

	useDeviceLanguage(Auth);

	const provider = new GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/plus.login');

	try {
		if (isMobile) {
			await signInWithRedirect(Auth, provider);
		} else {
			await signInWithPopup(Auth, provider);
		}
	} catch (error) {
		alert(error.message);
	}
}
```

Update main.js

```js
/* ~/src/main.js */

import { createApp, readonly, ref } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from './initFirebase';
import { getUserData } from './auth/auth';

router.beforeEach((to, from, next) => {
	const { currentUser } = Auth;
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	if (requiresAuth && !currentUser) {
		next({ path: '/' });
	} else {
		next();
	}
});

let app;
const user = ref({});

onAuthStateChanged(Auth, async (firebaseUser) => {
	if (!firebaseUser) {
		user.value = {};
	} else {
		user.value = await getUserData(firebaseUser);
	}

	if (!app) {
		app = createApp(App);
		app.provide('user', readonly(user)); // now user is globally available
		app.use(router);
		app.mount('#app');
	}
});
```
