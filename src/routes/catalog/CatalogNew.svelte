<script>
    import {onMount} from "svelte";
    import {badgeClasses, page, sortTarget, tree} from "../../stores/filterCatalog";
    import BadgeCard from "../../components/shared/BadgeCard.svelte";
    import Spinner from "../../components/Spinner.svelte";
    import BadgeListView from "../../components/shared/BadgeListView.svelte";
    import SideBarCatelog from "../../components/catalog/SideBarCatelog.svelte";
    import CatalogToolBar from "../../components/catalog/CatalogToolBar.svelte";
    import {sortTargetOptions} from "../../util/catalogFilters";
    import {translatePropertiesRawQueriesBadgeClass} from "../../util/utils";
    import Pagination from "../../components/Pagination.svelte";
    import {catalogPageCount} from "../../util/pagination";
    import I18n from "i18n-js";
    import {fetchRawCatalogBadgeClasses} from "../../api";

    let loaded = false;
    let view = "cards";

    onMount(() => {
        const alreadyLoaded = $badgeClasses.length > 0;
        if (alreadyLoaded) {
            loaded = true;
            return;
        }
        fetchRawCatalogBadgeClasses().then(res => {
            translatePropertiesRawQueriesBadgeClass(res);
            $badgeClasses = res;
            $sortTarget = sortTargetOptions()[0];
            loaded = true;
        })
    });

</script>

<style lang="scss">
    .page-container {
        display: flex;
        @media (max-width: 820px) {
            flex-direction: column;
        }

    }

    .content {
        flex: 1;
        padding: 30px 20px;
    }

    div.badges {
        --badge-margin-right: 20px;

        &.cards {
            display: grid;
            grid-template-columns: 31% 31% 31%;
            grid-row: auto;
            grid-column-gap: 25px;
            grid-row-gap: 25px;
            margin-right: calc(var(--badge-margin-right) * -1);
        }

        &.list {
            display: flex;
            flex-direction: column;
        }

    }

    @media (max-width: 1120px) {
        div.badges.cards {
            grid-template-columns: 48% 48%;
        }
    }

    @media (max-width: 820px) {
        div.badges.cards {
            grid-template-columns: 97%;
        }
    }


</style>

<div class="page-container">
    {#if loaded}
        <SideBarCatelog/>
        <div class="content">
            <CatalogToolBar bind:sorting={$sortTarget} bind:view={view}/>

            <div class={`badges ${view === "list" ? "list" : "cards"}`}>
                {#if view === "list"}
                    <BadgeListView badges={$tree.paginatedBadges} isBadgesClass={true} isPublic={true}/>
                {:else}
                    {#each $tree.paginatedBadges as badge}
                        <BadgeCard isPublic={true} badgeClass={badge} withHeaderData={false}/>
                    {/each}
                {/if}
            </div>
            <Pagination currentPage={$tree.page}
                        total={$tree.badgeClasses.length}
                        onChange={nbr => $page = nbr}
                        pageCount={catalogPageCount}/>
        </div>
    {:else}
        <Spinner message={I18n.t("catalog.busy")}/>
    {/if}

</div>
