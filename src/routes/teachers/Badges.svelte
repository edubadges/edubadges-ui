<script>
    import {onMount} from "svelte";
    import {BadgeClassesToolBar, BadgesHeader, SideBarBadges} from "../../components/teachers";
    import {queryData} from "../../api/graphql";
    import {headerEntity, headerEntityMultiLanguage, headerStaff} from "../../api/queries";
    import {faculties, sortTarget, tree} from "../../stores/filterBadges";
    import BadgeCard from "../../components/shared/BadgeCard.svelte";
    import Spinner from "../../components/Spinner.svelte";
    import {ects, eqf, extensionValue, studyLoad, timeInvestment} from "../../components/extensions/badges/extensions";
    import BadgeListView from "../../components/shared/BadgeListView.svelte";
    import {translateProperties} from "../../util/utils";
    import {badgeClassFilterTypes, sortTargetOptions} from "../../util/catalogFilters";
    import Pagination from "../../components/Pagination.svelte";
    import {catalogPageCount, pageCount} from "../../util/pagination";
    import {page} from "../../stores/filterBadges";
    import {badgeClassTypes} from "../../util/badgeClassTypes";

    const query = `query {
    faculties {
      ${headerEntityMultiLanguage},
      ${headerStaff},
      imageDutch,
      imageEnglish,
      onBehalfOf,
      onBehalfOfDisplayName,
      onBehalfOfUrl,
      institution {
        imageDutch,
        imageEnglish,
        nameDutch,
        nameEnglish
      },
      issuers {
        ${headerEntityMultiLanguage},
        ${headerStaff},
        imageDutch,
        imageEnglish
        badgeclasses {
          name,
          image,
          entityId,
          archived,
          isMicroCredentials,
          createdAt,
          extensions {
            name,
            originalJson
          },
          permissions {
            mayAward
          },
          typeBadgeClass,
          tags       {
            id, name
          },
          isPrivate,
          directAwardedAssertionsCount,
          selfRequestedAssertionsCount,
          pendingEnrollmentCount,
        }
      },
    }
  }`;

    let loaded;
    let view = "cards";

    onMount(() => {
        queryData(query).then(res => {
            res.faculties.forEach(faculty => {
                translateProperties(faculty);
                translateProperties(faculty.institution);
                faculty.issuers.forEach(issuer => {
                    issuer.faculty = faculty;
                    if (!issuer.image) {
                        if (faculty.image) {
                            issuer.image = faculty.image;
                        } else {
                            issuer.image = faculty.institution.image;
                        }
                    }
                    translateProperties(issuer);
                    issuer.badgeclasses.forEach(badgeClass => {
                        badgeClass.issuer = issuer;
                        translateProperties(badgeClass.issuer);
                        translateProperties(badgeClass.issuer.faculty);
                        translateProperties(badgeClass.issuer.faculty.institution);

                        badgeClass.studyLoad = extensionValue(badgeClass.extensions, studyLoad);
                        badgeClass.ects = extensionValue(badgeClass.extensions, ects);
                        badgeClass.eqf = extensionValue(badgeClass.extensions, eqf);
                        badgeClass.timeInvestment = extensionValue(badgeClass.extensions, timeInvestment);

                        badgeClass.types = [];
                        if (badgeClass.archived) {
                            badgeClass.types.push(badgeClassFilterTypes.ARCHIVED);
                        } else if (badgeClass.isPrivate) {
                            badgeClass.types.push(badgeClassFilterTypes.DRAFT);
                        } else if (badgeClass.isMicroCredentials) {
                            badgeClass.types.push(badgeClassFilterTypes.MICRO_CREDENTIALS);
                        } else if (badgeClass.typeBadgeClass.toLowerCase() === badgeClassTypes.REGULAR) {
                            badgeClass.types.push(badgeClassFilterTypes.REGULAR);
                        } else {
                            badgeClass.types.push(badgeClassFilterTypes.EXTRA_CURRICULAR);
                        }
                    });
                });
            })
            $faculties = res.faculties;
            $sortTarget = sortTargetOptions()[0];
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
