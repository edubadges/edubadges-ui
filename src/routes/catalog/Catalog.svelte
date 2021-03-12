<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {badgeClasses, tree, sortTarget} from "../../stores/filterCatalog";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";
  import Spinner from "../../components/Spinner.svelte";
  import {ects, eqf, extensionValue, studyLoad} from "../../components/extensions/badges/extensions";
  import BadgeListView from "../../components/shared/BadgeListView.svelte";
  import SideBarCatelog from "../../components/catalog/SideBarCatelog.svelte";
  import CatalogToolBar from "../../components/catalog/CatalogToolBar.svelte";
  import {assignFilterTypes} from "../../util/catalogFilters";
  import {Router} from "svelte-routing";

  const query = `query {
    publicInstitutions {
      name,
      image,
      institutionType,
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
            assertionsCount,
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

  let loaded = false;
  let view = "cards";

  let a = [];

  onMount(() => {
    const alreadyLoaded = $badgeClasses.length > 0;
    if (alreadyLoaded) {
      loaded = true;
      return;
    }
    queryData(query).then(res => {
      const institutions = res.publicInstitutions;
      const results = institutions.reduce((acc, institution) => {
        institution.count = 0;
        institution.publicFaculties.forEach(faculty => {
          faculty.publicIssuers.forEach(issuer => {
            issuer.image = issuer.image || institution.image;
            issuer.publicBadgeclasses.forEach(badgeClass => {
              //catalog query is different then others, so we need to set the references
              badgeClass.issuer = issuer;
              badgeClass.issuer.faculty = faculty;
              badgeClass.issuer.faculty.institution = institution;
              ++institution.count;
              badgeClass.institution = institution;
              //used in the filtering
              badgeClass.studyLoad = extensionValue(badgeClass.extensions, studyLoad);
              badgeClass.ects = extensionValue(badgeClass.extensions, ects);
              badgeClass.eqf = extensionValue(badgeClass.extensions, eqf);
              assignFilterTypes(badgeClass);
              acc.push(badgeClass);
            })
          })
        });
        return acc;
      }, []);
      $badgeClasses = results;
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
    <Router>

    </Router>
    <SideBarCatelog/>

    <div class="content">
      <CatalogToolBar bind:sorting={$sortTarget} bind:view={view}/>

      <div class={`badges ${view === "list" ? "list" : "cards"}`}>
        {#if view === "list"}
          <BadgeListView badges={$tree.badgeClasses} isBadgesClass={true} isPublic={true}/>
        {:else}
          {#each $tree.badgeClasses as badge}
            <BadgeCard isPublic={true} badgeClass={badge} withHeaderData={false}/>
          {/each}
        {/if}
      </div>
    </div>
  {:else}
    <Spinner/>
  {/if}

</div>