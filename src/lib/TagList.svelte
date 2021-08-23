<script>
  export let tags
  export let active = ''
</script>

<ul>
  {#each tags as tag}
    <li>
      <a href="/?tag={tag}" class="ce" class:active={active == tag}>
        <span>#{tag}</span>
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    /* align-self: center; */
    justify-content: center;
  }

  a {
    --x: 2.6rem;
    text-decoration: none;

    padding: 0 1.6rem;
    line-height: 1;
    height: var(--x);
    border-radius: var(--x);
    border: 1px solid transparent;

    background-color: var(--text-accent);
    color: var(--bg);
  }

  a.active,
  a:hover {
    color: var(--secondary);
  }

  :global(html.dark) a {
    color: var(--text-accent);
    background-color: var(--bg);
    border-color: currentColor;
    transition: all 300ms ease-in;
  }

  :global(html.dark) a.active,
  :global(html.dark) a:hover {
    /* background-color: var(--bg-darker); */
    color: var(--text-hover);
  }
</style>
