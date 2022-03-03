<script>
  import '../css/reset.css'
  import '../css/vars.css'
  import '../css/app.css'
  import '../css/utils.css'
  import '../css/card.css'

  import MyHeader from '$lib/Header.svelte'
  import StopWar from '$lib/StopWar.svelte'
</script>

<StopWar />

<div class="wrap">
  <MyHeader />

  <main>
    <slot />
  </main>
</div>

<footer class="ce">
  <div>DelphicTop,</div>

  <div>
    <span> built with </span>
    <a class="link" href="https://kit.svelte.dev/" target="_blank" rel="noopener noreferrer">
      SvelteKit
    </a>
    ,
  </div>

  <div>
    <a
      class="link"
      href="https://github.com/diogenesofweb/blog"
      target="_blank"
      rel="noopener noreferrer"
    >
      Repo in Github
    </a>
  </div>
</footer>

<style>
  :global(#svelte) {
    position: relative;
  }

  .wrap {
    min-height: 100vh;
  }

  main {
    padding: 0 var(--space-x);
  }

  footer {
    gap: 1ch;

    min-height: 33vh;
    margin-top: 33vh;

    text-align: center;
    border-top: 1px solid var(--line);

    background-color: var(--bg-darker);
  }

  .link {
    color: var(--text);
  }
</style>
