<script>
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {BadgeClassHeader} from "../teachers";
    import {Search, Spinner} from "../index";
    import {entityType} from "../../util/entityTypes"
    import {queryData} from "../../api/graphql";
    import mailIcon from "../../icons/mail-white.svg";
    import globeIcon from "../../icons/network-information.svg";
    import trophyIcon from "../../icons/school-book-trophy.svg";
    import PublicBreadcrumb from "./PublicBreadcrumb.svelte";
    import {ects, eqf, extensionValue, studyLoad, timeInvestment} from "../extensions/badges/extensions";
    import BadgeCard from "./BadgeCard.svelte";
    import BadgeListView from "./BadgeListView.svelte";
    import ViewSelector from "./ViewSelector.svelte";
    import {translateProperties} from "../../util/utils";
    import {catalogPageCount, pageCount} from "../../util/pagination";
    import Pagination from "../Pagination.svelte";

    export let entityId;
    export let visitorRole;

    let issuer = {publicBadgeclasses: [], faculty: {institution: {}}};
    let view = "cards";
    let search = "";
    let loaded;

    const query = `query ($entityId: String){
    publicIssuer(id: $entityId) {
      nameEnglish,
      nameDutch,
      descriptionEnglish,
      descriptionDutch,
      imageEnglish,
      imageDutch,
      urlEnglish,
      urlDutch,
      email,
      entityId,
      createdAt,
      faculty {
        nameEnglish,
        nameDutch,
        imageDutch,
        imageEnglish,
        onBehalfOf,
        onBehalfOfUrl,
        onBehalfOfDisplayName,
        entityId,
        institution {
          nameEnglish,
          nameDutch,
          imageDutch,
          imageEnglish,
          entityId,
          brin,
          gradingTable,
          countryCode
        }
      },
      publicBadgeclasses {
        name,
        image,
        entityId,
        archived,
        directAwardedAssertionsCount,
        selfRequestedAssertionsCount,
        createdAt,
        extensions {
          name,
          originalJson
        }
      }
    }
  }`

    onMount(() => {
        queryData(query, {entityId}).then(res => {
            issuer = res.publicIssuer;

            translateProperties(issuer);
            translateProperties(issuer.faculty);
            translateProperties(issuer.faculty.institution);

            if (!issuer.image) {
                issuer.image = issuer.faculty.image || issuer.faculty.institution.image;
            }

            issuer.publicBadgeclasses.forEach(badgeClass => {
                badgeClass.issuer = issuer;
                badgeClass.institution = issuer.faculty.institution;
                //used in the filtering
                badgeClass.studyLoad = extensionValue(badgeClass.extensions, studyLoad);
                badgeClass.ects = extensionValue(badgeClass.extensions, ects);
                badgeClass.eqf = extensionValue(badgeClass.extensions, eqf);
                badgeClass.timeInvestment = extensionValue(badgeClass.extensions, timeInvestment);
            });
            loaded = true;
        });
    });

    let page = 1;

    $: badgeClasses = search.trim().length === 0 ? issuer.publicBadgeclasses : issuer.publicBadgeclasses
        .filter(bc => bc.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    $: paginatedBadgeClasses = badgeClasses.slice((minimalPage - 1) * pageCount, minimalPage * pageCount)
    $: minimalPage = Math.min(page, Math.ceil(badgeClasses.length / pageCount))

</script>

<style lang="scss">
    .info {
        margin-bottom: 30px;
        word-break: break-all;
    }

    section.icons {
        padding: 0 25px;

        div {
            border-bottom: 1px solid var(--grey-4);
            padding: 20px;
            display: flex;
            align-content: center;

            &:last-child {
                border-bottom: none;
            }

            a {
                padding-left: 20px;
                display: inline-block;
            }
        }
    }

    :global(section.icons svg) {
        width: 24px;
        height: auto;
    }

    @media (max-width: 1120px) {
        .issuer-detail {
            padding: 20px !important;
        }
    }

    div.issuer-detail {
        padding: 40px 140px;
    }

    span.institution-slot {
        margin-top: 8px;
    }

    div.page-container {
        width: 100%;

        div.view-selector {
            display: flex;
            align-content: center;
            @media (max-width: 1120px) {
                flex-direction: column;
            }

            div.search {
                margin: 4px 25px 0 auto;
                width: 360px;
            }

            margin-left: 20px;
            padding: 10px;
        }

        div.badges {
            padding: 0 20px 30px 20px;
            flex: 1;

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

    }
</style>

<div class="page-container">
    <PublicBreadcrumb issuer={issuer}/>
    {#if loaded}
        <BadgeClassHeader
                entity={entityType.ISSUER}
                object={issuer}
                isPublic={true}
                hasDescription={true}
                visitorRole={visitorRole}
                entityId={entityId}>
      <span slot="institution" class="institution-slot">
           <span>{I18n.t("catalog.issuer.institution")}
               {#if issuer.faculty.onBehalfOf}
                   <a href={`/public/faculties/${issuer.faculty.entityId}`}>{issuer.faculty.name}</a>
                    {:else}
                   <a href={`/public/institutions/${issuer.faculty.institution.entityId}`}>{issuer.faculty.institution.name}</a>
               {/if}
               <span class="country-code">({issuer.faculty.institution.countryCode})</span>
           </span>
	    </span>
            <section class="icons">
                {#if issuer.email}
                    <div>
                        {@html mailIcon}
                        <a href={`mailto:${issuer.email}`}>{I18n.t("catalog.issuer.contact")}</a>
                    </div>
                {/if}
                {#if issuer.url}
                    <div>
                        {@html globeIcon}
                        <a href={issuer.url} target="_blank">{I18n.t("catalog.issuer.website")}</a>
                    </div>
                {/if}
                {#if issuer.faculty.institution.gradingTable}
                    <div>
                        {@html trophyIcon}
                        <a href={issuer.faculty.institution.gradingTable}
                           target="_blank">{I18n.t("catalog.issuer.gradingTable")}</a>
                    </div>
                {/if}
            </section>
        </BadgeClassHeader>
        <div class="content">
            <div class="view-selector">
                <h3>{I18n.t("teacher.badgeclasses.title")} ({issuer.publicBadgeclasses.length})</h3>
                <div class="search">
                    <Search bind:value={search}/>
                </div>
                <ViewSelector bind:view={view} noForceLeft={true}/>
            </div>
            <div class={`badges ${view === "list" ? "list" : "cards"}`}>
                {#if view === "list"}
                    <BadgeListView badges={paginatedBadgeClasses} isBadgesClass={true} isPublic={true}/>
                {:else}
                    {#each paginatedBadgeClasses as badge}
                        <BadgeCard isPublic={true} badgeClass={badge} withHeaderData={false}/>
                    {/each}
                {/if}
            </div>
        </div>
        <Pagination currentPage={page}
                    total={badgeClasses.length}
                    onChange={nbr => page = nbr}
                    pageCount={pageCount}/>
    {:else}
        <Spinner/>
    {/if}
</div>
