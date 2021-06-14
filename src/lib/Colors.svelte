<section>
	<div class="col">
		<button>lets</button>
		<button>click</button>
		<button>some</button>
		<button>buttons</button>
	</div>

	<div class="col">
		<button class="alfa">alfa</button>
		<button class="beta">beta</button>
		<button class="warning">warning</button>
		<button class="danger">danger</button>
	</div>

	<div class="btns-group">
		<button>lets</button>
		<button>click</button>
		<button>some</button>
		<button>buttons</button>
	</div>

	<div class="btns-group with-outline">
		<button>lets</button>
		<button>click</button>
		<button>some</button>
		<button>buttons</button>
	</div>

	<div class="btns-group">
		<button class="alfa">lets</button>
		<button class="alfa">click</button>
		<button class="alfa">some</button>
		<button class="alfa">buttons</button>
	</div>

	<div class="btns-group">
		<button class="alfa">lets</button>
		<button class="beta">click</button>
		<button class="warning">some</button>
		<button class="danger">buttons</button>
	</div>

	<div class="btns-group with-outline">
		<button class="alfa">lets</button>
		<button class="beta">click</button>
		<button class="warning">some</button>
		<button class="danger">buttons</button>
	</div>
</section>

<style>
	section {
		margin: 3rem 0;
	}
	.col {
		display: flex;
		gap: 1rem;
		margin: 1rem 0;
	}
	:global(:root) {
		--radius: 0.75rem;
		--width: 2px;
		--gap: 1px;
		--color-border: rgb(47, 24, 24);

		--border-color: hsla(0, 0%, 50%, 0.25);
		--my-border: var(--gap) solid var(--border-color);

		--my-color: 250;
		--my-color-light: var(--my-color), 90%;
		--my-color-dark: var(--my-color), 15%;

		--my-text-accent: hsla(var(--my-color-light), 56%, 1);
		--my-text-accent-hover: hsla(var(--my-color-light), 46%, 1);

		--bg-main: hsla(var(--my-color-dark), 96%, 1);
		--bg-hover: hsla(var(--my-color-dark), 98%, 1);

		--btn-box-shadow: 0 0 1px var(--width) hsla(var(--my-color-light), 50%, 0.25);
		--filter-on-focus-visible: brightness(90%);
	}

	:global(html.dark) .btns-group {
		--color-border: rgb(47, 24, 24);

		--border-color: hsla(0, 0%, 50%, 0.33);
		/* --my-border: var(--gap) solid var(--border-color); */

		--my-color: 250;
		--my-color-light: var(--my-color), 90%;
		--my-color-dark: var(--my-color), 15%;

		--my-primary-color: 150;

		--my-primary-color-light: var(--my-primary-color), 90%;
		--my-primary-color-dark: var(--my-primary-color), 15%;

		--prime-btn-bg: hsla(var(--my-primary-color-dark), 15%, 1);
		--prime-btn-bg-hover: hsla(var(--my-primary-color-dark), 12%, 1);

		--my-text-accent: hsla(var(--my-color-light), 82%, 1);
		--my-text-accent-hover: hsla(var(--my-color-light), 88%, 1);

		--bg-main: hsla(var(--my-color-dark), 15%, 1);
		--bg-hover: hsla(var(--my-color-dark), 18%, 1);

		--btn-box-shadow: 0 0 1px var(--width) hsla(var(--my-color-light), 80%, 0.5);

		--filter-on-focus-visible: brightness(80%);
	}

	:global(:root) {
		--red: 0;
		--red-1: var(--red), 76%;
		--danger: hsl(var(--red-1), 75%);
		--danger-hover: hsl(var(--red-1), 80%);

		/* color: hsl(44, 100%, 77%); */
		--yellow: 44;
		--yellow-1: var(--yellow), 100%;
		--warning: hsl(var(--yellow-1), 65%);
		--warning-hover: hsl(var(--yellow-1), 70%);

		--blue: 240;
		--blue-base: var(--blue), 80%;
		--alfa: hsl(var(--blue-base), 60%);
		--alfa-hover: hsl(var(--blue-base), 65%);

		--green: 150;
		--green-1: var(--green), 60%;
		--beta: hsl(var(--green-1), 40%);
		--beta-hover: hsl(var(--green-1), 45%);
	}

	:global(html.dark) {
		--red: 0;
		--red-1: var(--red), 30%;
		--danger: hsl(var(--red-1), 30%);
		--danger-hover: hsl(var(--red-1), 35%);

		--yellow: 60;
		--yellow-1: var(--yellow), 40%;
		--warning: hsl(var(--yellow-1), 20%);
		--warning-hover: hsl(var(--yellow-1), 25%);

		--blue: 240;
		--blue-base: var(--blue), 15%;
		--alfa: hsl(var(--blue-base), 20%);
		--alfa-hover: hsl(var(--blue-base), 30%);

		--green: 120;
		--green-1: var(--green), 20%;
		--beta: hsl(var(--green-1), 20%);
		--beta-hover: hsl(var(--green-1), 25%);
	}

	:global(:root) {
		--my-color-hue: 250;
		--my-btn-color: var(--my-color-hue), 15%;

		--btn-text: var(--text);
		--btn-text: black;
		--btn-text-hover: var(--btn-text);

		--btn-bg: hsla(var(--my-btn-color), 20%, 1);
		--btn-bg-hover: hsla(var(--my-btn-color), 30%, 1);
	}

	:global(html.dark) {
		--btn-text: white;
	}

	.btns-group {
		position: relative;
		display: inline-flex;
		margin: 1rem 0;
	}

	button {
		position: relative;

		padding: 1rem 2rem;

		color: var(--btn-text);
		--btn-bg: hsl(0, 0%, 50%, 0.1);
		--btn-bg-hover: hsl(0, 0%, 50%, 0.2);
		background-color: var(--btn-bg);

		text-transform: uppercase;
		line-height: 1;
		letter-spacing: 2px;
		/* transition: all 300ms ease-in; */

		border-radius: 0.33rem;
	}

	.btns-group > button {
		border-radius: 0;
	}

	button.alfa {
		--btn-bg: var(--alfa);
		--btn-bg-hover: var(--alfa-hover);
	}

	button.beta {
		--btn-bg: var(--beta);
		--btn-bg-hover: var(--beta-hover);
	}

	button.danger {
		--btn-bg: var(--danger);
		--btn-bg-hover: var(--danger-hover);
	}

	button.warning {
		--btn-bg: var(--warning);
		--btn-bg-hover: var(--warning-hover);
	}

	button:is(.alfa, .beta) {
		--btn-text: white;
		--btn-text-hover: white;
	}

	button:focus-visible {
		z-index: 1;
		/* box-shadow: var(--btn-box-shadow); */
		box-shadow: 0 0 0.2rem black;

		/* box-shadow: 0 0 1px var(--width) var(--accent-30); */
	}

	:global(html.dark) button:focus-visible {
		box-shadow: 0 0 0.2rem white;
	}

	button:focus:not(:focus-visible) {
		z-index: 1;
		filter: var(--filter-on-focus-visible);
		/* box-shadow: 0 0 0.25rem 0.25rem inset hsl(0, 0%, 50%, 0.1); */
	}

	/* button:focus:hover {
		filter: brightness(100%);
	} */

	button:hover {
		/* filter: brightness(100%) !important; */
		color: var(--btn-text-hover);
		background-color: var(--btn-bg-hover);
	}

	.btns-group button:first-child {
		border-radius: var(--radius) 0 0 var(--radius);
	}

	.btns-group button:last-child {
		border-radius: 0 var(--radius) var(--radius) 0;
	}

	.btns-group.with-outline > button {
		border: var(--my-border);
		border-left: none;
	}
	.btns-group.with-outline > button:first-child {
		border: var(--my-border);
	}
	/* 
	:global(:root) {
		--bg-1: hsl(0, 100%, 50%);
		--bg-1: hsl(60, 100%, 50%);

		--bg-1: hsl(240, 100%, 50%);
		--bg-1: hsl(120, 100%, 25%);
	}
 */
</style>
