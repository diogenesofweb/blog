<script>
	import { page } from '$app/stores';
</script>

<div>
	<h1>{$page.status}</h1>
	<h2>{$page.error.message}</h2>
</div>

<style>
	div {
		padding: 2rem 1rem;
		font-size: clamp(2rem, 50vw, 4rem);

		text-align: center;
	}

	h1,
	h2 {
		color: var(--fg-danger);
		margin-block: 1rem;
	}
</style>
