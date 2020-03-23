<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { institutionIcon, issuerIcon } from "../../icons";
  import { queryData } from "../../api/graphql";

  let institution;

  const query = `{
    currentUser {
      institution {
        name
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institution = res.currentUser.institution;
    });
  });
</script>

<style>
  :global(.entity svg.icon-institution) {
    width: calc(var(--entity-icon-width) - (2 * var(--hor-padding-m)));
  }

  :global(.entity .tab svg) {
    width: 20px;
    margin-right: 14px;
  }

  .entity {
    display: flex;
    padding-top: var(--ver-padding-m);
    background: var(--color-background-grey-light);
  }

  .icon {
    padding: 0 var(--hor-padding-m);
  }

  .content .info {
    margin-bottom: var(--ver-padding-m);
  }

  .tab {
    padding: var(--ver-padding-s) var(--hor-padding-m);
    background: white;
    white-space: nowrap;
    cursor: pointer;
  }
</style>

<div class="entity">
  <div class="icon">
    {@html institutionIcon}
  </div>
  <div class="content">
    <div class="info">
      {#if institution}
        <h3>{institution.name}</h3>
      {/if}
    </div>
    <div class="tabs">
      <div class="tab">
        {@html issuerIcon}
        {I18n.t('manage.tabs.issuers')}
      </div>
    </div>
  </div>
</div>
