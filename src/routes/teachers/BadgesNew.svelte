<script>
    import {onMount} from "svelte";
    import {BadgeClassesToolBar, SideBarBadges} from "../../components/teachers";
    import {badgeClasses, page, sortTarget, tree} from "../../stores/filterBadgesNew";
    import BadgeCard from "../../components/shared/BadgeCard.svelte";
    import Spinner from "../../components/Spinner.svelte";
    import BadgeListView from "../../components/shared/BadgeListView.svelte";
    import {translatePropertiesRawQueriesBadgeClass} from "../../util/utils";
    import {sortTargetOptions} from "../../util/catalogFilters";
    import Pagination from "../../components/Pagination.svelte";
    import {catalogPageCount} from "../../util/pagination";
    import {fetchRawBadgeClasses} from "../../api";
    import BadgesHeaderNew from "../../components/teachers/BadgesHeaderNew.svelte";
    import {currentInstitution} from "../../stores/user";

    let loaded;
    let view = "cards";

    onMount(() => {
        fetchRawBadgeClasses().then(res => {
            translatePropertiesRawQueriesBadgeClass(res);
            res.forEach(badgeClass => {
                badgeClass.mayAward = badgeClass.bc_staff || badgeClass.iss_staff || badgeClass.fac_staff || badgeClass.ins_staff;
                badgeClass.tags = badgeClass.tags ? badgeClass.tags.split(",") : [];
            });
            $badgeClasses = res;
            $sortTarget = sortTargetOptions()[0];
            loaded = true;
        })
    });

</script>

<style lang="scss">
    .page-container {
        display: flex;
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
        div.badges {
            grid-template-columns: 48% 48%;
        }
    }

    @media (max-width: 820px) {
        div.badges {
            grid-template-columns: 97%;
        }
    }


</style>

<div class="page-container">
    {#if loaded}
        <SideBarBadges/>

        <div class="content">
            <BadgesHeaderNew institution={$currentInstitution}/>

            <BadgeClassesToolBar bind:sorting={$sortTarget} bind:view={view}/>

            <div class={`badges ${view === "list" ? "list" : "cards"}`}>
                {#if view === "list"}
                    <BadgeListView badges={$tree.paginatedBadges} isBadgesClass={true}/>
                {:else}
                    {#each $tree.paginatedBadges as badge}
                        <BadgeCard withPendingEnrollments={true} badgeClass={badge} withHeaderData={false}/>
                    {/each}
                {/if}
            </div>
            <Pagination currentPage={$tree.page}
                        total={$tree.badgeClasses.length}
                        onChange={nbr => $page = nbr}
                        pageCount={catalogPageCount}/>
        </div>
    {:else}
        <Spinner/>
    {/if}

</div>
