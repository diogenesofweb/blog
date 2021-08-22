<script>
  export let posts
</script>

<ol>
  {#each posts as post}
    <li>
      <h2 class="font2">
        <a href="/blog/{post.title.replaceAll(' ', '_').toLowerCase()}">
          {post.title}
        </a>
      </h2>

      <p>{post.description}</p>

      <div class="tags">
        {#each post.tags as tag}
          <a href="/?tag={tag}">
            <span>#{tag}</span>
          </a>
        {/each}
      </div>
    </li>
  {/each}
</ol>

<style>
  ol {
    list-style: none;
    padding: 0;
  }

  li {
    position: relative;
    overflow: hidden;

    padding: 0.5rem var(--space-x) 0;
    box-shadow: 0 0 1.2rem -0.4rem var(--text-accent);
    border-radius: 0.75rem;

    transition: 300ms ease-in;
    transition-property: background-color, box-shadow;

    background-color: transparent;
  }

  li::before {
    position: absolute;
    z-index: -1;
    content: '';
    inset: 0;

    background: linear-gradient(
      100deg,
      var(--bg-darker) 25%,
      var(--bg) 50%,
      var(--bg-darker) 50%,
      var(--bg) 75%
    );
  }

  li:hover {
    box-shadow: 0 0 1.6rem -0.4rem var(--text-hover);
    background-color: var(--bg-darker);
  }

  li ~ li {
    margin-top: 3.5rem;
  }

  a {
    color: var(--text-accent);
    text-decoration: none;
  }

  a:hover {
    color: var(--text-hover);
  }

  .tags {
    border-top: 1px dotted var(--text-accent);
    padding: 1rem 0 1.5rem;

    display: flex;
    gap: 1ch;
    /* background-color: rgba(240, 248, 255, 0.356); */
  }

  .tags a {
    padding: 0.4rem 1rem;
    border-radius: 1rem 0;

    box-shadow: 3px 3px 1.5rem -1rem inset var(--text-accent);
    transition: box-shadow 300ms ease-in;

    background-color: var(--bg);
  }

  @media (hover: hover) {
    li:hover .tags a {
      box-shadow: 3px 3px 1.5rem -0.8rem inset var(--text-hover);
    }
  }
</style>
