<script>
  import I18n from "i18n-js";
  import {link} from "svelte-routing";
  import chevronRightSmall from "../../icons/chevron-right-small.svg";
  import {onMount} from "svelte";

  export let badgeClass;
  export let institution;
  export let issuer;

</script>

<style lang="scss">
  div.bread-crumb {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  a, span.path {
    color: var(--text-color-grey);
  }

  span.path {
    cursor: not-allowed;
  }

  a:last-of-type,

  ,
  span.path:last-of-type {
    font-weight: var(--semi-bold);
  }

  a:not(:last-of-type), span.path:not(:last-of-type) {
    color: var(--text-grey-dark)
  }

  span.crumb {
    height: 14px;
    width: 14px;
    margin: auto 4px;
  }


</style>

<div class="bread-crumb">
  <a use:link href="/catalog">{I18n.t("catalog.name")}</a>
  <span class="crumb">{@html chevronRightSmall}</span>
  {#if badgeClass}
    <a use:link
       href={`/public/institutions/${badgeClass.issuer.faculty.institution.entityId}`}>{badgeClass.issuer.faculty.institution.name}</a>
    <span class="crumb">{@html chevronRightSmall}</span>
    <span class="path">{badgeClass.issuer.faculty.name}</span>
    <span class="crumb">{@html chevronRightSmall}</span>
    <a use:link href={`/public/issuers/${badgeClass.issuer.entityId}`}>{badgeClass.issuer.name}</a>
    <span class="crumb">{@html chevronRightSmall}</span>
    <a use:link href={`/public/${badgeClass.entityId}`}>{badgeClass.name}</a>
  {:else if institution}
    <a use:link href={`/public/institutions/${institution.entityId}`}>{institution.name}</a>
  {:else if issuer}
    <a use:link
       href={`/public/institutions/${issuer.faculty.institution.entityId}`}>{issuer.faculty.institution.name}</a>
    <span class="crumb">{@html chevronRightSmall}</span>
    <span class="path">{issuer.faculty.name}</span>
    <span class="crumb">{@html chevronRightSmall}</span>
    <a use:link href={`/public/issuers/${issuer.entityId}`}>{issuer.name}</a>
  {/if}
</div>
