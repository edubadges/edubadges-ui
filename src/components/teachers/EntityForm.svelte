<script>
  import I18n from "i18n-js";

  export let create;
  export let entity;
  export let submit;
</script>

<style>
  div.entity-form {
    flex: 1;
    padding: var(--ver-padding-l) var(--hor-padding-m);
  }
</style>

<div class="entity-form">
  <h3>{I18n.t(['manage', create ? 'new' : 'edit', entity])}</h3>
  <slot />
  <button on:click={submit} class="btn">
    {I18n.t(['manage', create ? 'new' : 'edit', 'save'])}
  </button>
</div>
