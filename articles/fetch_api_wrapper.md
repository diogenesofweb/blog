---
title: Fetch API wrapper
description: Simple Fetch API wrapper
created: 2021-05-03
updated: 2023-08-05
tags:
  - 'JS'
  - 'Fetch'
---

It's nice to be able to call API (with intelesense and warnings) like this:

```js
const { body } = await api.collectionName.find(itemID);
const { body, status } = await api.collectionName.create(itemOdj);
const { body, status } = await api.collectionName.update(itemID, updateObj);
```

Yes, I will rarely need `status`, but not never. Ex: API call may return **200** or **204** depending if it has been updated or already is up to date.

Here is an example (Hypothetical cooking recipe app)\
I want just have some utility to help out in my component

```js
// let's pretend variables are reactive
let recipe,
	error,
	status = 'fetching';

try {
	const recipeID = route.params.id;
	const { body } = await api.recipes.find(recipeID);
	// console.log(body)
	recipe = body;
} catch (err) {
	// console.error(err)
	error = err.message || 'Something went wrong :(';
} finally {
	status = 'fetched';
}
```

Here's all available back-end API, keeped in one place

```js
// ~/api.js
import http from './fetchWrapper.js';

const recipes = 'recipes';

/** @enum {function} */
const Recipes = {
	find: (/** @type {number} */ id) => http.get(`/${recipes}/${id}`),
	list: (query = '') => http.get(`/${recipes}${query}`),
	create: (data) => http.post(recipes, { data, auth: true }),
	update: (/** @type {number} */ id, data) =>
		http.patch(`/${recipes}/${id}`, { data, auth: true }),
	del: (/** @type {number} */ id) =>
		http.del(`/${recipes}/${id}`, { auth: true }),
	actions: (/** @type {number} */ id, data) =>
		http.post(`/${recipes}/${id}/actions`, {
			data,
			auth: true,
			timeout: 3 * 30 * 1000,
		}),
};

const api = {
	recipes: Recipes,
};

export default api;
```

I prefer to have a default **timeout** of 30 seconds, with the option to set duration (in ms) on demand.\
**Bearer token** will be sent only if `{auth:true}` is set\
[Firebase Authentication](https://firebase.google.com/docs/auth) is used\_

```js
// ~/fetchWrapper.js

import { Auth } from '../initFirebase.js';
import { getIdToken } from 'firebase/auth';

const baseURL = 'http://localhost:3001/v1'; // in development
const TIMEOUT_DEFAULT = 30 * 1000;

/**
 * @param {string} URL
 * @param {{
 * data?: object;
 * formData?: object;
 * auth?: boolean;
 * timeout?: number;
 * }} opts
 */
async function wrapper(URL, method = 'GET', opts) {
	/* TIMEOUT START */
	const timeout = opts.timeout ? opts.timeout : TIMEOUT_DEFAULT;
	const controller = new AbortController();
	const signal = controller.signal;

	setTimeout(() => controller.abort(), timeout);
	// Fetch will ignore .abort() call if the request has already completed
	/* TIMEOUT END */

	/**@type {RequestInit} */
	const config = {
		method: method,
		headers: { 'Content-Type': 'application/json' },
		body: opts.data && JSON.stringify(opts.data),
		signal,
	};

	if (opts.formData) {
		config.body = opts.formData;
		// don't know why, but if form-data, Fetch wants to figure out headers by itself
		config.headers = {};
	}

	if (opts.auth) {
		const token = await getIdToken(Auth.currentUser);
		// if not using firebase, and keeping tokens in localStorage
		// const token = window.localStorage.getItem(localStorageKey)

		if (!token) throw new Error('Where is my token ?');

		config.headers['Authorization'] = `Bearer ${token}`;
	}

	let response;

	try {
		response = await fetch(`${baseURL}${URL}`, config);
	} catch (error) {
		// console.error(error)
		const message =
			error.name === 'AbortError' ? 'Fetch Aborted' : 'Network Error';

		return Promise.reject({ message });
	}

	// console.log(response)

	const { status, ok } = response;

	if (status === 401) {
		console.warn('logout ? refresh token ? what should I do ?');
	}

	let body;

	if (status !== 204) {
		body = await response.json();
	}

	if (!ok) {
		/* Even though the response was errored, it may come with a helpful message, that's why body is returned with status*/
		return Promise.reject({ status, ...body });
	}

	return { status, body };
}
```

As the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) wrapper is done, one last thing to add.

```js
// ~/fetchWrapper.js

const http = {
	/** @param {string} URL */
	async get(URL, opts = {}) {
		return wrapper(URL, 'GET', opts);
	},
	/** @param {string} URL */
	async post(URL, opts = {}) {
		return wrapper(URL, 'POST', opts);
	},
	/** @param {string} URL */
	async patch(URL, opts = {}) {
		return wrapper(URL, 'PATCH', opts);
	},
	/** @param {string} URL */
	async del(URL, opts = {}) {
		return wrapper(URL, 'DELETE', opts);
	},
};

export default http;
```
