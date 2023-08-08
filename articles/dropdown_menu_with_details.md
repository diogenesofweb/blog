---
title: Dropdown menu with details
description: How to create a dropdown menu with a HTML details tag using CSS and some JavaScript
created: 2021-07-24
updated: 2023-08-05
tags:
  - 'HTML'
  - 'CSS'
  - 'JS'
---

<iframe src="https://diogenesofweb.github.io/demo-dropdown/"
        title="Demo: checkbox and radio " 
        width="300" height="420">
</iframe>

[Demo](https://diogenesofweb.github.io/demo-dropdown/) & [Repo](https://github.com/diogenesofweb/demo-dropdown)

---

Making dropdown menu with [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) is easy.

First, create HTML skeleton.

```html
<details class="dropdown">
	<summary>
		<span>dropdown</span>

		<span class="up"> ⬆️ </span>
		<span class="down"> ⬇️ </span>
	</summary>

	<div class="menu">
		<div class="menu-list">
			<a href="#!" class="menu-list-item">item 0</a>
			<a href="#!" class="menu-list-item">item 1</a>
			<a href="#!" class="menu-list-item">item 2</a>
		</div>
	</div>
</details>
```

Then, make it look like a [button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button).

```css
details.dropdown {
	display: inline;
}

details.dropdown > summary {
	position: relative;
	overflow: hidden;
	display: flex;
	gap: 1rem;
	padding: 1rem 2rem;
	border-radius: 1rem;
	text-transform: capitalize;
	cursor: pointer;
	background-color: white;
}

details.dropdown > summary:hover {
	background-color: lightblue;
}
```

Show arrows depending on the state (open or close).

```css
details.dropdown > summary span.up {
	display: none;
}

details.dropdown[open] > summary span.up {
	display: inline;
}

details.dropdown[open] > summary span.down {
	display: none;
}
```

Add a backdrop on the open state.

```css
details.dropdown[open] > summary::before {
	z-index: 100;
	position: fixed;
	inset: 0;
	content: ' ';
	background-color: hsla(0, 0%, 50%, 0.66);
	cursor: default;
}
```

Place the menu just on bottom.

```css
details.dropdown[open] .menu {
	z-index: 1;
	position: absolute;
	display: block;
}

details.dropdown.right[open] .menu {
	right: 0;
}
```

Customize the menu list.

```css
details.dropdown .menu-list {
	max-height: 20rem;
	overflow-y: auto;
	margin-top: 0.5rem;
	padding: 0.33rem 0;
	border-radius: 1rem;
	box-shadow: 0 0 0.9rem -0.1rem hsla(0, 0%, 0%, 0.75);
	background-color: white;
}

details.dropdown .menu-list-item {
	display: flex;
	align-items: center;
	gap: 1rem;
	width: 100%;
	padding: 1rem 1.2rem;
	color: var(--text);
	background-color: transparent;
	text-decoration: none;
	line-height: 1;
}

details.dropdown .menu-list-item:is(:hover, :focus) {
	color: blue;
	background-color: hsla(0, 0%, 50%, 0.1);
}
```

A little bit of [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) to close the dropdown on click event inside the menu.

```js
function closeDropdown(id) {
	console.log('closeDropdown', id);

	if (id) {
		document.getElementById(id)?.removeAttribute('open');
	} else {
		document.querySelectorAll('details.dropdown')?.forEach((el) => {
			el.removeAttribute('open');
		});
	}
}
```

Attach the event listener.

```html
<div class="menu" onclick="closeDropdown()">
	<!--  -->
</div>
```
