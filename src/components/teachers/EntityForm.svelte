<script>
  import I18n from "i18n-js";
  import Breadcrumb from "./Breadcrumb.svelte";

  export let faculty;
  export let issuer;
  export let badgeclassName = "";

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

<Breadcrumb faculty={faculty} issuer={issuer} badgeclassName={badgeclassName} edit={!create} create={create} entity={entity}/>

<div class="entity-form">
  <h3>{I18n.t(['manage', create ? 'new' : 'edit', entity])}</h3>
  <slot/>
  <button on:click={() => window.history.back()} class="btn ghost">
    {I18n.t(['manage', create ? 'new' : 'edit', 'cancel'])}
  </button>
  <button on:click={submit} class="btn">
    {I18n.t(['manage', create ? 'new' : 'edit', 'save'])}
  </button>
</div>
