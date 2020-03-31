<script>
  import { getContext } from "svelte";
  import { ROUTER } from "svelte-routing/src/contexts";
  import { currentPath } from "../stores/currentPath";

  let { activeRoute } = getContext(ROUTER);
  $: if ($activeRoute) {
    $currentPath = window.location.pathname || $activeRoute.uri;
  }
</script>
