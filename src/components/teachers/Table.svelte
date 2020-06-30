<script>
  import I18n from "i18n-js";
  import {link} from "svelte-routing";
  import {Search, Button, CheckBox} from "../../components";
  import {TableHeaders} from "../teachers";
  import {sortType} from "../../util/sortData";

  export let mayCreate;
  export let entity = "";
  export let pathParameters = [];
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
    <Search bind:value={search}/>
    {#if mayCreate}
      <Button
          href={`/manage/${entity}/new/${pathParameters.join("/")}`}
          text={I18n.t(['manage', 'new', entity])}/>
    {/if}
  </div>
  <slot name="check-buttons"/>
  <table class="entity-table">
    <thead>
      <tr>
        {#if withCheckAll}
          <th>
            <CheckBox bind:value={checkAllValue} onChange={onCheckAll}/>
          </th>
        {/if}
        <TableHeaders {tableHeaders} {setSort} {sort}/>
      </tr>
    </thead>
    <tbody>
      <slot/>
    </tbody>
  </table>
</div>
