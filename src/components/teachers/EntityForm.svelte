<script>
  import I18n from "i18n-js";

  export let entity;
</script>

<style>
  div.entity-form {
    flex: 1;
    padding: var(--ver-padding-l) var(--hor-padding-m);
  }
</style>

<div class="entity-form">
  <h3>{I18n.t(['manage', 'edit', entity])}</h3>
  <slot />
</div>
