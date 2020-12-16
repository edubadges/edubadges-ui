<script>
  import {onMount} from "svelte";
  import {navigate} from "svelte-routing";
  import {SideBarBadges, BadgesHeader, BadgeClassesToolBar} from "../../components/teachers";
  import {queryData} from "../../api/graphql";
  import {headerEntity, headerStaff} from "../../api/queries";
  import {faculties, awardFilter, tree} from "../../stores/filterBadges";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";
  import Spinner from "../../components/Spinner.svelte";
  import { ects, extensionValue, studyLoad } from "../../components/extensions/badges/extensions";

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
              name
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
  let sorting;

  const sortBadges = (badges, sorting) => {
    if (!sorting) return badges;

    return badges.sort((a, b) => {
      switch (sorting.value) {
        case "recent":
          return a.createdAt - b.createdAt;
        case "awarded":
          return b.badgeAssertions.length - a.badgeAssertions.length;
      }
    });
  };

  $: sortedBadges = sortBadges($tree.badgeClasses.filter(el => !$awardFilter || el.permissions.mayAward), sorting);

  onMount(() => {
    queryData(query).then(res => {
      for (const faculty of res.faculties) {
        for (const issuer of faculty.issuers) {
          if (!issuer.image) issuer.image = res.faculties[0].institution.image;
          for (const badgeClass of issuer.badgeclasses) {
              badgeClass.studyLoad = extensionValue(badgeClass.extensions, studyLoad);
              badgeClass.ects = extensionValue(badgeClass.extensions, ects);
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

    display: grid;
    grid-template-columns: 31% 31% 31%;
    grid-row: auto;
    grid-column-gap: 25px;
    grid-row-gap: 25px;
    margin-right: calc(var(--badge-margin-right) * -1);
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

      <BadgeClassesToolBar
          bind:sorting={sorting}
      />

      <div class="badges">
        {#each sortedBadges as badge}
          <BadgeCard badgeClass={badge} withHeaderData={false}/>
        {/each}
      </div>
    </div>
  {:else}
    <Spinner/>
  {/if}

</div>
