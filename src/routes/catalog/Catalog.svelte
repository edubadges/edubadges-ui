<script>
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import {badgeClasses, page, sortTarget, tree} from "../../stores/filterCatalog";
    import BadgeCard from "../../components/shared/BadgeCard.svelte";
    import Spinner from "../../components/Spinner.svelte";
    import {ects, eqf, extensionValue, studyLoad} from "../../components/extensions/badges/extensions";
    import BadgeListView from "../../components/shared/BadgeListView.svelte";
    import SideBarCatelog from "../../components/catalog/SideBarCatelog.svelte";
    import CatalogToolBar from "../../components/catalog/CatalogToolBar.svelte";
    import {assignFilterTypes} from "../../util/catalogFilters";
    import {translateProperties} from "../../util/utils";
    import Pagination from "../../components/Pagination.svelte";
    import {catalogPageCount} from "../../util/pagination";

    const query = `query {
    publicInstitutions {
      nameEnglish,
      nameDutch,
      imageEnglish,
      imageDutch,
      institutionType,
      entityId,
      publicFaculties {
        nameEnglish,
        nameDutch
        entityId,
        onBehalfOf,
        onBehalfOfDisplayName,
        onBehalfOfUrl,
        publicIssuers {
          nameEnglish,
          nameDutch,
          entityId,
          imageEnglish,
          imageDutch,
          publicBadgeclasses {
            name,
            image,
            entityId,
            directAwardedAssertionsCount,
            selfRequestedAssertionsCount,
            archived,
            isPrivate,
            typeBadgeClass,
            createdAt,
            isMicroCredentials,
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

    onMount(() => {
        const alreadyLoaded = $badgeClasses.length > 0;
        if (alreadyLoaded) {
            loaded = true;
            return;
        }
        queryData(query).then(res => {
            const institutions = res.publicInstitutions;
            const results = institutions
                .filter(institution => institution.institutionType)
                .reduce((acc, institution) => {
                    institution.count = 0;
                    translateProperties(institution);
                    institution.publicFaculties.forEach(faculty => {
                        translateProperties(faculty);
                        faculty.publicIssuers.forEach(issuer => {
                            translateProperties(issuer);
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
        <Spinner/>
    {/if}

</div>
