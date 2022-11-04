---
title: Dropdown menu with details
description: Dropdown menu with <details> tag
created: 2021-07-24
tags:
  - 'HTML'
  - 'CSS'
---

<iframe src="https://diogenesofweb.github.io/demo-dropdown/"
        title="Demo: checkbox and radio " 
        width="300" height="420">
</iframe>

[Demo](https://diogenesofweb.github.io/demo-dropdown/) & [Repo](https://github.com/diogenesofweb/demo-dropdown)

---

skeleton

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

make look like a button

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

if arrows

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

add overlay on open

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

menu

```css
details.dropdown[open] .menu {
	z-index: 101;
	position: absolute;
	display: block;
}

details.dropdown.right[open] .menu {
	right: 0;
}
```

menu list

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

js util: close dropdown when clicked inside menu

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

add util

```html
<div class="menu" onclick="closeDropdown()">
	<!--  -->
</div>
```
