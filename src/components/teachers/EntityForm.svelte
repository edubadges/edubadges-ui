<script>
  import I18n from "i18n-js";
  import { Button } from "../../components";
  import Breadcrumb from "./Breadcrumb.svelte";

  export let faculty;
  export let issuer;
  export let badgeclassName = "";

  export let create;
  export let entity;
  export let submit;
</script>

<style>
  h3 {
    background: var(--purple-1);
    padding: var(--ver-padding-m) var(--hor-padding-m);
  }
</style>

<Breadcrumb
  {faculty}
  {issuer}
  {badgeclassName}
  edit={!create}
  {create}
  {entity} />

<h3>{I18n.t(['manage', create ? 'new' : 'edit', entity])}</h3>

<div class="main-content-margin">
  <slot />

  <Button
    secondary
    action={() => window.history.back()}
    text={I18n.t(['manage', create ? 'new' : 'edit', 'cancel'])} />
  <Button
    action={submit}
    text={I18n.t(['manage', create ? 'new' : 'edit', 'save'])} />
</div>
