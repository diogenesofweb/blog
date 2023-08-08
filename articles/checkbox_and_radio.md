---
title: Checkbox and radio
description: Making checkbox and radio buttons
created: 2021-06-20
tags:
  - 'HTML'
  - 'CSS'
---

<iframe src="https://diogenesofweb.github.io/demo-form-checkbox-radio/"
        title="Demo: checkbox and radio " 
        width="300" height="420">
</iframe>

[Demo](https://diogenesofweb.github.io/demo-form-checkbox-radio/) & [Repo](https://github.com/diogenesofweb/demo-form-checkbox-radio)

---

Put icons inside the `<body>` tag for reuse and cleaner code.\
**#check** icon for checkboxes and **#circle** for radio.

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

Let's call _boxes_ - form fields with input types checkbox and radio.

While the usual field would look something like this

```html
<div class="field">
	<input id="a" type="text" name="a" />
	<label for="a"> text </label>
</div>
```

For _boxes_, let’s add icons to visually replace default markers, and therefore make them consistent through all browsers.
Icons like this

```html
<div class="icon-holder">
	<svg viewBox="0 0 24 24"><use href="#id" /></svg>
</div>
```

---

So, let’s make HTML. One section with checkboxes and one with radio.

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

Layout elements.

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

Clicking `<input>` and `<label>` triggers state change, so their cursors will be **pointers**.
`<input>` is not taken away, just made **transparent** and placed above for clicks and on hover cursor change.`<label>` has some padding for largering space to click on.

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

The icon holder has a border, color of which will be changed depending on state. Holder for the radio button is round.

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

Icon holders and inputs have the same size.

```css
.box-item input,
.icon-holder {
	width: var(--icon-size);
	height: var(--icon-size);
}
```

While hovering over labels and inputs, let’s make some signaling (color change) that the click will actually do something and what value it corresponds to.\
Focus on click is redundant, so only display sort of outline for keyboard navigation.

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

The icon will appear or disappear depending on the form field being checked or not.

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
