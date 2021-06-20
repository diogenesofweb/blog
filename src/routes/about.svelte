<script context="module">
	import { browser, dev } from '$app/env'
	// export const hydrate = dev
	// export const router = browser

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true
</script>

<script>
	// import BtnGroup from '$lib/BtnGroup.svelte'
	// import Colors from '$lib/Colors.svelte'
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>Future About Page</h1>

<svg style="display: none;">
	<symbol id="check">
		<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
	</symbol>

	<symbol id="circle">
		<circle cx="12" cy="12" r="8" />
	</symbol>
</svg>

<form>
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
</form>

<!-- <BtnGroup />
<Colors /> -->
<style>
	form {
		--icon-size: 1.5rem;
		color: black;
		background-color: white;
	}

	/* Checkboxes & Radio */
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

	.icon-holder {
		color: gray;
		border: 2px solid currentColor;
		border-radius: 4px;
	}

	.icon-holder.round {
		border-radius: 50%;
	}

	.box-item input,
	.icon-holder {
		width: var(--icon-size);
		height: var(--icon-size);
	}

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

	/* Checkbox & radio icon */
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
	/* Checkbox & radio icon */
</style>
