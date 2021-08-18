<script>
	// @ts-nocheck
</script>

<div>
	<button class="ce sun" onclick="makeLightTheme()"><span>🌞</span></button>
	<button class="ce moon" onclick="makeDarkTheme()"><span>🌛</span></button>
</div>

<svelte:head>
	<script>
		const theme = 'my-theme'
		const dark = 'dark'

		;(function () {
			const myTheme = localStorage.getItem(theme)

			if (myTheme) {
				if (myTheme === dark) document.documentElement.classList.add(dark)
				return
			}

			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add(dark)
			}
		})()

		function makeLightTheme() {
			document.documentElement.classList.remove(dark)
			localStorage.setItem(theme, 'light')
		}

		function makeDarkTheme() {
			document.documentElement.classList.add(dark)
			localStorage.setItem(theme, dark)
		}
	</script>
</svelte:head>

<style>
	button {
		background-color: var(--primary);
		border-radius: 50%;
		line-height: 1;
		width: 40px;
		height: 40px;
		padding: 0;
	}

	button.sun {
		display: none;
		background-color: var(--bg);
	}

	:global(html.dark) button.moon {
		background-color: var(--bg);
		display: none;
	}

	:global(html.dark) button.sun {
		display: initial;
	}
</style>
