---
title: Svelte Tips
description: Svelte tips to work with stores, window.localStorage, watchers, dialog element
created: 2022-07-09
updated: 2023-07-27
tags:
  - 'svelte'
  - 'js'
---

### [Svelte](https://svelte.dev) and [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) without reactivity.

1. Setup function for localStore.

This function works well for primitive values and is type aware.

```js
/** ~/localstorage.js */
/**
 * @template T
 * @param {string} storageKey
 * @param {T} defaultsTo
 * @returns {{value: T, set: (val: T) => void}}
 */
function setupStorage(storageKey, defaultsTo) {
	const isBool = typeof defaultsTo === 'boolean';
	const isNum = typeof defaultsTo === 'number';

	function get() {
		const val = localStorage.getItem(storageKey);

		if (val) {
			if (isBool) return val === 'true' ? true : false;
			if (isNum) return Number(val);
			return val;
		}

		return defaultsTo;
	}

	const obj = {
		/** @param {T} val */
		set(val) {
			this.value = val;
			localStorage.setItem(storageKey, `${val}`);
		},

		value: get(),
	};
	// @ts-ignore
	return obj;
}
```

2. Define key-values pairs.

All items in one place. Easy to add, remove or change. Editor will be able to provide intellisense, and warn if some variable is misspelled or missing.

```js
/** ~/localstorage.js */
/** @enum {any} */
const storage = {
	rounds: setupStorage('Rounds', 10),
	color: setupStorage('Color', 'blue'),
	isActive: setupStorage('Is_active', true),
};
export default storage;
```

3. Use with onchange, oninput or other.

```svelte
<script>
	import storage from '~/localstorage.js';

	const rounds = storage.rounds.value;
	/** @param {Event & { currentTarget: EventTarget & HTMLInputElement; }} ev */
	function onChangeRound(ev) {
		const val = ev.currentTarget.valueAsNumber;
		storage.rounds.set(val);
	}

	const isActive = storage.isActive.value;
	/** @param {Event & { currentTarget: EventTarget & HTMLInputElement; }} ev */
	function onChangeActive(ev) {
		const checked = ev.currentTarget.checked;
		storage.isActive.set(checked);
	}

	const colors = ['blue', 'yellow'];
	const color = storage.color.value;
	/** @param {Event & { currentTarget: EventTarget & HTMLSelectElement; }} ev */
	function onChange(ev) {
		const val = ev.currentTarget.value;
		storage.color.set(val);
	}
</script>

<label>
	Rounds
	<input
		type="number"
		min="0"
		step="1"
		value={rounds}
		on:change={onChangeRound}
	/>
</label>

<label>
	Active
	<input type="checkbox" checked={isActive} on:change={onChangeActive} />
</label>

<label>
	My color
	<select value={color} on:change={onChangeColor}>
		{#each colors as color}
			<option>{color}</option>
		{/each}
	</select>
</label>
```

---

### [Svelte Store](https://svelte.dev/docs/svelte-store) and [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

Wrap writable store in a function that will set localStorage item on store update (skipping first subscription call).

```js
/** ~/store.js */
import { writable } from 'svelte/store';

/**
 * @template  T
 * @param {string} key
 * @param {T} defaultsTo
 * @returns {import('svelte/store').Writable<T>}
 */
function setupStore(key, defaultsTo) {
	const isBool = typeof defaultsTo === 'boolean';
	const isNum = typeof defaultsTo === 'number';

	function get() {
		const val = localStorage.getItem(key);

		if (val) {
			if (isBool) return val === 'true' ? true : false;
			if (isNum) return Number(val);
			return val;
		} else {
			return defaultsTo;
		}
	}

	const initVal = get();
	const store = writable(initVal);

	let first = true;

	store.subscribe((v) => {
		if (first) {
			first = false;
		} else {
			localStorage.setItem(key, `${v}`);
		}
	});
	// @ts-ignore
	return store;
}

export const rounds = setupStore('Rounds', 10);
export const color = setupStore('Color', 'blue');
export const isActive = setupStore('top_panel', true);
```

```svelte
<script>
	import { rounds, isActive, color } from '~/store.js';
	const colors = ['blue', 'yellow'];
</script>

<label>
	Rounds
	<input type="number" min="0" step="1" bind:value={$rounds} />
</label>

<label>
	Active
	<input type="checkbox" bind:checked={$isActive} />
</label>

<label>
	My color
	<select bind:value={$color}>
		{#each colors as color}
			<option>{color}</option>
		{/each}
	</select>
</label>
```

---

### Watch variable in Svelte

Easiest way to watch for value changes.

```svelte
<script>
	let word = '';

	$: watch(word);

	/** @param {string} val */
	function watch(val) {
		console.log(val);
		if (val.length > 3) localStorage.setItem('Word', val);
	}
</script>

<label>
	Word
	<input type="text" bind:value={word} />
</label>
```

---

### Close [the HTML dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) in Svelte

Simply attach an `on:click` event to the dialog that closes the modal window on click outside.

```svelte
<script>
	/** @type {HTMLDialogElement} */
	let dialog;
</script>

<button on:click={() => dialog.showModal()}>open</button>

<dialog
	bind:this={dialog}
	on:click={(ev) => ev.target === dialog && dialog.close()}
>
	<button on:click={() => dialog.close()}>close me</button>

	<slot>
		<button on:click={(ev) => ev.target.closest('dialog').close()}>
			close me from child component
		</button>
	</slot>
</dialog>

<style>
	dialog {
		padding: 0;
	}
</style>
```
