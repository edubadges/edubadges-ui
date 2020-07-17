<script>
  import {link} from "svelte-routing";

  export let path;
  export let name;

</script>
<style>

  a {
    color: var(--black);
    text-decoration: underline;
  }

</style>

<a href={path} use:link>{name}</a>