<script context="module">
  import { browser, dev } from '$app/env'

  export const hydrate = dev
  export const router = browser
  export const prerender = true
</script>

<script>
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>Future About Page</h1>

<style>
  h1 {
    color: var(--text-hover);
  }
</style>
