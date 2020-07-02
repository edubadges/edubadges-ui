<script>
  import I18n from "i18n-js";
  import { Button } from "../../components";
  import Breadcrumb from "./Breadcrumb.svelte";

  export let faculty;
  export let issuer;
  export let badgeclass;
  export let badgeclassName = "";

  export let create;
  export let entity;
  export let submit;
</script>

<style lang="scss">
  h2 {
    background: var(--purple-1);
    padding: var(--ver-padding-l) var(--hor-padding-l);
  }

  .offset {
    max-width: fit-content;
    margin: 0;
  }
</style>

<Breadcrumb
  {faculty}
  {issuer}
  {badgeclass}
  {badgeclassName}
  edit={!create}
  {create}
  {entity} />

<h2>{I18n.t(['manage', create ? 'new' : 'edit', entity])}</h2>

<div class="main-content-margin">
  <div class="offset">
    <slot />

    <Button
      secondary
      action={() => window.history.back()}
      text={I18n.t(['manage', create ? 'new' : 'edit', 'cancel'])} />
    <Button
      action={submit}
      text={I18n.t(['manage', create ? 'new' : 'edit', 'save'])} />
  </div>
</div>
