<script>
  import {onMount} from "svelte";
  import {BadgeClassesToolBar, BadgesHeader, SideBarBadges} from "../../components/teachers";
  import {queryData} from "../../api/graphql";
  import {headerEntity, headerStaff} from "../../api/queries";
  import {awardFilter, faculties, tree, sortTarget} from "../../stores/filterBadges";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";
  import Spinner from "../../components/Spinner.svelte";
  import {ects, eqf, extensionValue, studyLoad} from "../../components/extensions/badges/extensions";
  import BadgeListView from "../../components/shared/BadgeListView.svelte";

  const query = `query {
    faculties {
      institution {
        image
      },
      ${headerEntity},
      ${headerStaff},
      issuers {
        ${headerEntity},
        image,
        ${headerStaff},
        badgeclasses {
          name,
          image,
          entityId,
          createdAt,
          extensions {
            name,
            originalJson
          },
          issuer {
            name,
            image,
            faculty {
              name,
              institution {
                name
              }
            }
          },
          permissions {
            mayAward
          },
          badgeAssertions {
            entityId
          }
        }
      },
    }
  }`;

  let loaded;
  let view = "cards";

  onMount(() => {
    queryData(query).then(res => {
      for (const faculty of res.faculties) {
        for (const issuer of faculty.issuers) {
          if (!issuer.image) {
            issuer.image = res.faculties[0].institution.image;
          }
          for (const badgeClass of issuer.badgeclasses) {
            badgeClass.studyLoad = extensionValue(badgeClass.extensions, studyLoad);
            badgeClass.ects = extensionValue(badgeClass.extensions, ects);
            badgeClass.eqf = extensionValue(badgeClass.extensions, eqf);
          }
        }
      }
      $faculties = res.faculties;
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
      <BadgesHeader/>

      <BadgeClassesToolBar bind:sorting={$sortTarget} bind:view={view}/>

      <div class={`badges ${view === "list" ? "list" : "cards"}`}>
        {#if view === "list"}
          <BadgeListView badges={$tree.badgeClasses} isBadgesClass={true}/>
        {:else}
          {#each $tree.badgeClasses as badge}
            <BadgeCard badgeClass={badge} withHeaderData={false}/>
          {/each}
        {/if}
      </div>
    </div>
  {:else}
    <Spinner/>
  {/if}

</div>
