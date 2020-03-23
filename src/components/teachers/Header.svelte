<script>
  import { getContext } from "svelte";
  import { ROUTER } from "svelte-routing/src/contexts";
  import { link, navigate } from "svelte-routing";
  import I18n from "i18n-js";

  import { Header } from "../../components";

  let currentPath = "";
  let { activeRoute } = getContext(ROUTER);
  $: if ($activeRoute) currentPath = $activeRoute.uri;
</script>

<style>
  nav {
    align-self: flex-end;
    white-space: nowrap;
  }

  nav a {
    padding: var(--ver-padding-s) var(--hor-padding-m);
    font-weight: bold;
    border-radius: var(--button-border-radius);
    margin-right: 20px;
  }

  nav a:not(.active) {
    background: var(--color-background-grey-light);
  }

  nav a.active {
    background: white;
  }
</style>

<Header logout>
  <nav>
    {#each ['/', '/manage'] as tab}
      <a href={tab} use:link class="button" class:active={currentPath === tab}>
        {I18n.t(['header', 'nav', tab])}
      </a>
    {/each}
  </nav>
</Header>
