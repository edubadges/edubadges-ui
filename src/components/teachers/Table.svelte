<script>
    import I18n from "i18n-js";
    import {Button, CheckBox, Search} from "../../components";
    import {TableHeaders} from "../teachers";
    import {sortType} from "../../util/sortData";
    import Pagination from "../Pagination.svelte";
    import {pageCount} from "../../util/pagination";

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
    export let displayCheckAll = true;
    export let onCheckAll;
    export let checkAllDisabled = false;
    export let isEmpty;
    export let hideSearch;
    export let full = false;
    //Pagination
    export let filteredCount;
    export let page;
    export let onPageChange;

    const setSort = tableHeader => {
        if (sort.attribute === tableHeader.attribute) {
            sort.reverse = !sort.reverse;
        } else {
            sort = tableHeader;
        }
    };
</script>

<style lang="scss">

    div.container.full {
        width: 100%;
    }

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

<div class="container main-content-margin" class:full={full}>
    <div class="header">
        <h3>{title}</h3>
        {#if !hideSearch}
            <Search bind:value={search}/>
        {/if}
        {#if mayCreate}
            <Button
                    href={`/manage/${entity}/new/${pathParameters.join("/")}`}
                    text={I18n.t(['manage', 'new', entity], {name: ""})}/>
        {/if}
    </div>
    <slot name="check-buttons"/>
    <table class="entity-table">
        <thead>
        {#if !isEmpty}
            <tr>
                {#if withCheckAll}
                    <th class="checker">
                        {#if displayCheckAll}
                            <CheckBox bind:value={checkAllValue} onChange={onCheckAll} disabled={checkAllDisabled}/>
                        {/if}
                    </th>
                {/if}
                <TableHeaders {tableHeaders} {setSort} {sort}/>
            </tr>
        {/if}
        </thead>
        <tbody>
        <slot/>
        </tbody>
    </table>
    {#if onPageChange}
        <Pagination currentPage={page}
                    total={filteredCount}
                    onChange={onPageChange}
                    pageCount={pageCount}/>
    {/if}

</div>
