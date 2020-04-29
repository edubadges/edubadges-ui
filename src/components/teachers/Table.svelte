<script>
  import I18n from "i18n-js";
  import { link } from "svelte-routing";
  import { Search, Button, CheckBox } from "../../components";
  import { TableHeaders } from "../teachers";
  import { sortType } from "../../util/sortData";

  export let mayCreate;
  export let entity = "";
  export let title = "";
  export let tableHeaders = [];
  export let search = "";
  export let sort = {
    attribute: null,
    reverse: false,
    sortType: sortType.ALPHA
  };

  export let withCheckAll;
  export let checkAllValue;
  export let onCheckAll;
  export let showCheckActions;

  const setSort = tableHeader => {
    if (sort.attribute === tableHeader.attribute) {
      sort.reverse = !sort.reverse;
    } else {
      sort = tableHeader;
    }
  };
</script>

<style lang="scss">
  div.header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--ver-padding-m);

    :global(> *:not(:last-child)) {
      margin-right: var(--hor-padding-s);
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;

    thead {
      color: purple;
      border-bottom: 3px solid var(--grey-3);
      text-align: left;
      cursor: pointer;
    }

    th.checkbox {
      position: relative;

      span {
        position: absolute;
        bottom: 0;
        z-index: 1;

        > :global(*) {
          margin-left: var(--hor-padding-s);
        }
      }
    }
  }

  :global(table.entity-table th, table.entity-table td) {
    padding: var(--ver-padding-s) 0;
  }

  :global(table.entity-table tbody tr:not(:last-of-type) td) {
    border-bottom: var(--card-border);
  }
</style>

<div class="container main-content-margin">
  <div class="header">
    <h3>{title}</h3>

    <Search bind:value={search} />

    {#if mayCreate}
      <Button
        href={`/manage/${entity}/new`}
        text={I18n.t(['manage', 'new', entity])} />
    {/if}
  </div>

  <table class="entity-table">
    <thead>
      <tr>
        {#if withCheckAll}
          <th class="checkbox">
            <CheckBox bind:value={checkAllValue} onChange={onCheckAll} />

            {#if showCheckActions}
              <span>
                <slot name="check-buttons" />
              </span>
            {/if}
          </th>
        {/if}

        <TableHeaders {tableHeaders} {setSort} {sort} hide={showCheckActions} />

      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</div>
