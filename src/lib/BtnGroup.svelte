<div class="btns">
	<button>lets</button>
	<button>click</button>
	<button>some</button>
	<button>buttons</button>
</div>

<style>
	.btns {
		--radius: 0.5rem;
		--width: 2px;
		--gap: 1px;

		--border-color: var(--line);
		--border: var(--gap) solid var(--border-color);

		position: relative;

		display: inline-flex;
		gap: var(--gap);

		background-color: var(--border-color);

		border: var(--border);
		border-radius: var(--radius);
	}
	button {
		position: relative;
		padding: 1rem 2rem;

		background-color: var(--bg-darker);
		color: var(--text-hover);

		text-transform: uppercase;
		line-height: 1;
		letter-spacing: 2px;

		transition: color 300ms ease-in;
	}

	button:focus {
		z-index: 1;
		box-shadow: 0 0 1px var(--width) var(--text-hover);
	}

	button:hover {
		filter: sepia(50%);
	}

	button:first-child {
		border-radius: var(--radius) 0 0 var(--radius);
	}

	button:last-child {
		border-radius: 0 var(--radius) var(--radius) 0;
	}
</style>
