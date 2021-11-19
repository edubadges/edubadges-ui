<script>
    import I18n from "i18n-js";
    import {formatAdminNames} from "../../util/entityHeader";
    import moment from "moment";

    export let entity;
    export let headerItems = [];
</script>

<style lang="scss">
  div {
    display: flex;
  }

  h5 {
    height: 20px;
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
      height: 20px;
    }
  }
</style>

<div>
    {#each headerItems as {attr, type, value} (attr)}
    <span>
      <h5>{I18n.t(['models', entity, attr])}</h5>
        {#if value !== null && value !== undefined}
      {#if type === 'date'}
          <p>{moment(value).format('MMM D, YYYY')}</p>
      {:else if type === 'adminNames'}
          <p>{formatAdminNames(value)}</p>
      {:else if type === 'link'}
          {#if value}
              <p><a class="is-link" href={value} rel="noreferrer noopener" target="_blank">visit website</a></p>
          {:else}<p>-</p>{/if}
      {:else if type === 'email'}
          {#if value}
              <p>{value}</p>
          {:else}<p>-</p>{/if}
      {:else}<p>{value}</p>{/if}
        {/if}
    </span>
    {/each}
</div>
