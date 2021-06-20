---
title: Checkboxes and radio
description: Checkboxes and radio
created: 2021-06-20
tags:
  - 'HTML'
  - 'CSS'
---

## lorem

---

```html
<svg style="display: none;">
	<symbol id="check">
		<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
	</symbol>

	<symbol id="circle">
		<circle cx="12" cy="12" r="8" />
	</symbol>
</svg>
```

```html
<div class="field">
	<input id="a" type="text" name="a" />
	<label for="a"> text </label>
</div>
```

```html
<div class="icon-holder">
	<svg viewBox="0 0 24 24"><use href="#id" /></svg>
</div>
```

```html
<form>
	<h2>Checkbox</h2>

	<section class="field-with-boxes">
		<div class="box-item">
			<input id="html" type="checkbox" name="tech" />
			<div class="icon-holder">
				<svg viewBox="0 0 24 24"><use href="#check" /></svg>
			</div>
			<label for="html"> HTML </label>
		</div>

		<div class="box-item">
			<input id="css" type="checkbox" name="tech" />
			<div class="icon-holder">
				<svg viewBox="0 0 24 24"><use href="#check" /></svg>
			</div>
			<label for="css"> CSS </label>
		</div>

		<div class="box-item">
			<input id="js" type="checkbox" name="tech" />
			<div class="icon-holder">
				<svg viewBox="0 0 24 24"><use href="#check" /></svg>
			</div>
			<label for="js"> JS </label>
		</div>
	</section>

	<h2>Radio</h2>

	<section class="field-with-boxes">
		<div class="box-item">
			<input id="q1" type="radio" name="q" />
			<div class="icon-holder round">
				<svg viewBox="0 0 24 24"><use href="#circle" /></svg>
			</div>
			<label for="q1"> Yes </label>
		</div>

		<div class="box-item">
			<input id="q2" type="radio" name="q" />
			<div class="icon-holder round">
				<svg viewBox="0 0 24 24"><use href="#circle" /></svg>
			</div>
			<label for="q2"> No </label>
		</div>
	</section>
</form>
```

```css
form {
	--icon-size: 1.5rem;
	color: black;
	background-color: white;
}

.field-with-boxes {
	--gap: 0.66rem;
	display: flex;
	flex-direction: column;
	gap: var(--gap);
}

.box-item {
	position: relative;
	display: flex;
	align-items: center;
}
```

```css
.box-item label {
	cursor: pointer;
	padding: 0.1em 1em 0.1em var(--gap);
	transition: color 250ms ease-in;
}

.box-item input {
	position: absolute;
	inset: unset;
	z-index: 1;
	opacity: 0;
	cursor: pointer;
	margin: 0;
}
```

```css
.icon-holder {
	color: gray;
	border: 2px solid currentColor;
	border-radius: 4px;
}

.icon-holder.round {
	border-radius: 50%;
}
```

```css
.box-item input,
.icon-holder {
	width: var(--icon-size);
	height: var(--icon-size);
}
```

```css
.box-item input:hover ~ label,
.box-item label:hover {
	color: blue;
}

input:checked + .icon-holder {
	color: blue;
}

input:focus-visible + .icon-holder {
	box-shadow: 0 0 0.05rem 0.2rem lightskyblue;
}
```

```css
input + .icon-holder svg {
	width: 100%;
	height: auto;
	fill: currentColor;

	transform: scale(0);
	transition: transform 250ms ease-in;
}

input:checked + .icon-holder svg {
	transform: scale(1);
}
```
