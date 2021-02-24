<script>
  import {onMount} from "svelte";
  import {BadgeClassesToolBar, BadgesHeader, SideBarBadges} from "../../components/teachers";
  import {queryData} from "../../api/graphql";
  import {awardFilter, faculties, tree} from "../../stores/filterBadges";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";
  import Spinner from "../../components/Spinner.svelte";
  import {ects, eqf, extensionValue, studyLoad} from "../../components/extensions/badges/extensions";
  import BadgeListView from "../../components/shared/BadgeListView.svelte";

  const query = `query {
    publicInstitutions {
      name,
      image,
      entityId,
      publicFaculties {
        name,
        entityId,
        publicIssuers {
          name,
          entityId,
          image,
          publicBadgeclasses {
            name,
            image,
            entityId,
            assertionsCount
            createdAt,
            extensions {
              name,
              originalJson
            }
          }
        }
      }
    }
}`;

  let loaded;
  let sorting;
  let view = "cards";

  let institutions = [];
  let a = [];

  const sortBadges = (badges, sorting) => {
    if (!sorting) {
      return badges;
    }

    return badges.sort((a, b) => {
      switch (sorting.value) {
        case "recent":
          return a.createdAt - b.createdAt;
        case "awarded":
          return b.assertionsCount - a.assertionsCount;
      }
    });
  };

  $: sortedBadges = sortBadges($tree.badgeClasses.filter(el => !$awardFilter || el.permissions.mayAward), sorting);

  onMount(() => {
    queryData(query).then(res => {
      institutions = res;
      loaded = true;
    });
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
      <BadgeClassesToolBar bind:sorting={sorting} bind:view={view}/>

      <div class={`badges ${view === "list" ? "list" : "cards"}`}>
        {#if view === "list"}
          <BadgeListView badges={sortedBadges} isBadgesClass={true}/>
        {:else}
          {#each sortedBadges as badge}
            <BadgeCard badgeClass={badge} withHeaderData={false}/>
          {/each}
        {/if}
      </div>
    </div>
  {:else}
    <Spinner/>
  {/if}

</div>
