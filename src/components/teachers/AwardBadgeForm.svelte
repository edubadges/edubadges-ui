<script>
  import I18n from "i18n-js";

  export let bulkAward;
  export let submit;
</script>

<style>
  div.entity-form {
    flex: 1;
    padding: var(--ver-padding-l) var(--hor-padding-m);
  }
</style>

<div class="entity-form">
  <h3>{I18n.t(['manage', bulkAward ? 'bulkAward' : 'award', 'title'])}</h3>
  <p>{I18n.t(['manage', bulkAward ? 'bulkAward' : 'award', 'description'])}</p>
  <slot />
  <button on:click={() => window.history.back()} class="btn ghost">
    {I18n.t(['manage', 'new', 'cancel'])}
  </button>
  <button on:click={submit} class="btn">
    {I18n.t(['manage', bulkAward ? 'bulkAward' : 'award', 'submit'])}
  </button>
</div>
