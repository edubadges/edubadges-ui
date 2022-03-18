<script>
    import {Button, CheckBox, Search} from "../../components";
    import {UsersTableHeaders} from "../teachers";
    import {sortType} from "../../util/sortData";

    export let title = "";
    export let subTitle = "";
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
    export let isEmpty;
    export let disabledCheckAll = false;

    export let buttons = [];

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
    align-items: center;

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
    padding: var(--ver-padding-m) 0;
  }

  :global(table.entity-table tbody tr:not(:last-of-type) td) {
    border-bottom: var(--card-border);
  }

</style>

<div class="container main-content-margin">
    <div class="header">
        <h3>{title}</h3>
        <p>{subTitle}</p>
        <Search bind:value={search}/>
        {#each buttons as button}
            {#if button.allowed}
                <Button text={button.text} action={button.action} disabled={button.disabled}/>
            {/if}
        {/each}
    </div>
    <slot name="check-buttons"/>
    <table class="entity-table">
        <thead>
        {#if !isEmpty}
            <tr>
                {#if withCheckAll}
                    <th class="checker">
                        <CheckBox disabled={disabledCheckAll} bind:value={checkAllValue} onChange={onCheckAll}/>
                    </th>
                {/if}
                <UsersTableHeaders {tableHeaders} {setSort} {sort}/>
            </tr>
        {/if}
        </thead>
        <tbody>
        <slot/>
        </tbody>
    </table>
</div>
