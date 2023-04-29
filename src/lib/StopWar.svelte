<section id="stop-war" class="f-mono">
	<a
		href="https://war.ukraine.ua/support-ukraine/"
		target="_blank"
		rel="noopener noreferrer"
	>
		<span>STAND WITH UKRAINE </span>

		<svg width="30" height="20">
			<rect width="30" height="20" fill="#005BBB" />
			<rect width="30" height="10" y="10" fill="#FFD500" />
		</svg>
	</a>
</section>

<style>
	#stop-war {
		z-index: 999;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		line-height: 1;
		padding: 1.5ch;
		background-color: black;
		font-size: 16px;
		text-align: center;
	}
	#stop-war a {
		/* color: red; */
		color: salmon;
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1ch;
	}
	#stop-war a:is(:hover, :focus) {
		text-decoration: underline;
	}
</style>
