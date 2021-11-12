<script>
  import I18n from "i18n-js";
  import {Button} from "../../components";
  import Breadcrumb from "./Breadcrumb.svelte";
  import RemovalConfirmation from "../forms/RemovalConfirmation.svelte";
  import {Spinner} from "../index";

  export let faculty;
  export let issuer;
  export let badgeclass;
  export let badgeclassName = "";
  export let mayDelete;
  export let hasUnrevokedAssertions;
  export let mayEdit = true;

  export let create;
  export let action;
  export let entityTypeName;
  export let entityId;
  export let parentId;
  export let submit;
  export let processing;

  let showRemoveModal = false;
  let deleting = false;
</script>

<style lang="scss">
  h2 {
    background: var(--purple-1);
    padding: var(--ver-padding-l) var(--hor-padding-l);
    margin: 0;
  }

  .offset {
    margin: 0;
  }

  div.actions {
    display: flex;
    margin-top: 25px;

    .button-container {
      &:not(:last-child) {
        margin-right: 15px;
      }

      &.delete {
        margin-left: auto;
        margin-right: 0;
        display: flex;
        flex-direction: column;
        span.may-not-delete {
          display: inline-block;
          margin-top: 10px;
          color: var(--grey-7);
          font-style: italic;
          font-size: 14px;
          max-width: 160px;
        }
      }
    }
  }
</style>

<Breadcrumb
  {faculty}
  {issuer}
  {badgeclass}
  {badgeclassName}
  edit={!create}
  {create}
  copy={action === "copy"}
  entity={entityTypeName}/>

<h2>{I18n.t(['manage', action  === "copy" ? 'copy' : create ? 'new' : 'edit', entityTypeName])}</h2>
<div class="main-content-margin">
  <div class="offset">
    <slot/>

    <div class="actions">
      <div class="button-container">
        <Button
          secondary
          disabled={processing || deleting || (!mayEdit && action  !== "copy")}
          action={() => window.history.back()}
          text={I18n.t(['manage', create ? 'new' : 'edit', 'cancel'])} />
      </div>
      <div class="button-container">
        <Button
          disabled={processing || deleting || (!mayEdit && action  !== "copy")}
          action={submit}
          text={I18n.t(['manage', create ? 'new' : 'edit', 'save'])}/>
      </div>
      {#if !create}
        <div class="button-container delete">
          <Button
            warning={true}
            disabled={!mayDelete || processing || deleting || hasUnrevokedAssertions}
            action={() => showRemoveModal = true}
            text={I18n.t("manage.delete.delete")}/>
          {#if mayDelete && hasUnrevokedAssertions}
            <span class="may-not-delete">{I18n.t(`manage.delete.info.assertionsBlock.${entityTypeName}`)}</span>
          {:else if !mayDelete}
            <span class="may-not-delete">{I18n.t(`manage.delete.info.noPermission.${entityTypeName}`)}</span>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

{#if mayDelete && hasUnrevokedAssertions == false}
  <RemovalConfirmation {entityTypeName} entityId={entityId} parentId={parentId} {showRemoveModal}
                       cancel={() => showRemoveModal=false} deleting={v => deleting = v}/>
{/if}
{#if processing || deleting}
  <Spinner/>
{/if}
