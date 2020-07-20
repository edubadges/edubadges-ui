<script>
  import {link} from "svelte-routing";

  export let path;
  export let name;

</script>
<style lang="scss">

  a {
    color: var(--black);
    text-decoration: underline;

    &:hover {
      color: var(--black);
    }
  }

</style>

<a href={path} use:link>{name}</a>