<script>
	let data = {
		name: '',
		email: '',
		subject: '',
		message: '',
	};

	function handleSubmit(e) {
		console.log(data);
	}
</script>

<svelte:head>
	<title>Contacts</title>
</svelte:head>

<form
	id="my-form"
	class="form v2 alpha"
	on:submit|preventDefault={handleSubmit}
>
	<label class="field">
		<i>Name</i>
		<input
			bind:value={data.name}
			type="text"
			required
			maxlength="33"
			minlength="2"
			name="name"
		/>
	</label>

	<label class="field">
		<i>Email</i>
		<input bind:value={data.email} type="email" required name="email" />
	</label>

	<label class="field">
		<i>Subject</i>
		<input
			bind:value={data.subject}
			type="text"
			required
			maxlength="33"
			minlength="3"
			name="subject"
		/>
	</label>

	<label class="field">
		<i>Message</i>
		<textarea
			bind:value={data.message}
			maxlength="999"
			minlength="20"
			rows="10"
			cols="30"
			name="message"
		/>
	</label>

	<button class="btn filled" type="submit">
		<b> Submit </b>
	</button>
</form>

<style>
	form {
		display: grid;
		gap: 2em;
		border-radius: var(--sx-s);
		border: 1px solid var(--fl);
		max-width: 80ch;
		margin-top: 6em;
		margin-inline: auto;
		padding-inline: var(--sx-m);
		padding-block: var(--sy-l) var(--sy-l);

		background: var(--bg1);
		/* background: linear-gradient(to right, var(--__bga1), var(--bg2)); */
	}
	/* :global(html.dark) form { */
	/* 	background: linear-gradient(to right bottom, var(--__bga1), var(--bg2)); */
	/* } */

	label > :is(input, textarea) {
		background: transparent;
	}
</style>
