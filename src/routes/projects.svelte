<script context="module">
  import { browser, dev } from '$app/env'

  export const hydrate = dev
  export const router = browser
  export const prerender = true
</script>

<script>
  const arr = [
    {
      name: 'Dwarform',
      desc:
        'Generate Svelte, Vue, HTML code snippets for making forms with Bootstrap, Bulma or custom CSS',
      link: 'https://dwarform.pages.dev/',
      repo: 'https://github.com/diogenesofweb/dwarform',
      npm: ''
    }
    // {
    //   name: 'Kazkadien',
    //   desc: 'Svelte Component Library',
    //   link: 'https://kazkadien.pages.dev/',
    //   repo: 'https://github.com/kazkadien/svelte',
    //   npm: 'https://www.npmjs.com/package/@kazkadien/svelte'
    // }
  ]
</script>

<svelte:head>
  <title>Projects</title>
</svelte:head>

<div class="container">
  <h1>My Projects:</h1>

  {#each arr as proj}
    <div class="card">
      <h2 class="font2">
        <a class="link" href={proj.link} target="_blank" rel="noopener noreferrer">
          {proj.name}
        </a>
      </h2>

      <p>{proj.desc}</p>

      <div class="tags">
        {#if proj.repo}
          <a class="link" href={proj.repo} target="_blank" rel="noopener noreferrer"> Repo </a>
        {/if}

        {#if proj.npm}
          <a class="link" href={proj.npm} target="_blank" rel="noopener noreferrer"> Repo </a>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .container {
    margin-inline: auto;
    max-width: 800px;
    display: grid;
    gap: 2rem;

    /* background-color: rgba(0, 255, 255, 0.1); */
  }

  h1 {
    padding-top: 1rem;
    color: var(--text);
  }
</style>
