<script>
  import I18n from "i18n-js";
  import { formatAdminNames } from "../../util/entityHeader";
  import moment from "moment";

  export let entity;
  export let headerItems = [];
</script>

<style lang="scss">
  div {
    display: flex;
  }

  span {
    padding-right: 15px;

    &:not(:first-child) {
      padding-left: 15px;
    }

    &:not(:last-child) {
      border-right: 1px solid var(--text-grey-light);
    }

    p, a.is-link {
      word-break: break-all;
    }
  }
</style>

<div>
  {#each headerItems as { attr, type, value } (attr)}
    <span>
      <h5>{I18n.t(['models', entity, attr])}</h5>

      {#if type === 'date'}
        {moment(value).format('MMM D, YYYY')}
      {:else if type === 'adminNames'}
        {formatAdminNames(value)}
      {:else if type === 'link'}
        {#if value}
          <a class="is-link" href={value} target="_blank">visit website</a>
        {:else}-{/if}
      {:else if type === 'email'}
        {#if value}
          <p>{value}</p>
        {:else}-{/if}
      {:else}{value}{/if}
    </span>
  {/each}
</div>
