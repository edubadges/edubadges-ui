<script>
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {BadgeClassHeader} from "../teachers";
    import {entityType} from "../../util/entityTypes"
    import PublicBreadcrumb from "./PublicBreadcrumb.svelte";
    import Spinner from "../Spinner.svelte";
    import {queryData} from "../../api/graphql";
    import PublicIssuers from "./PublicIssuers.svelte";
    import {translateProperties} from "../../util/utils";
    import mailIcon from "../../icons/mail-white.svg";
    import globeIcon from "../../icons/network-information.svg";
    import trophyIcon from "../../icons/school-book-trophy.svg";

    export let entityId;
    export let visitorRole;

    let faculty = {};
    let loaded = false;
    let issuers = [];


    const query = `query ($entityId: String){
    publicFaculty(id: $entityId) {
        nameEnglish,
        nameDutch,
        descriptionDutch,
        descriptionEnglish
        imageDutch,
        imageEnglish,
        entityId,
        onBehalfOf,
        onBehalfOfDisplayName,
        onBehalfOfUrl,
        institution {
              nameEnglish,
              nameDutch,
              descriptionEnglish,
              descriptionDutch,
              imageEnglish,
              imageDutch,
              institutionType,
              entityId,
        },
        publicIssuers {
          nameEnglish,
          nameDutch,
          entityId,
          imageEnglish,
          imageDutch,
          badgeclassesCount,
        }
    }
  }`

    onMount(() => {
        queryData(query, {entityId}).then(res => {
            faculty = res.publicFaculty;
            translateProperties(faculty.institution);
            translateProperties(faculty);
            faculty.publicIssuers.forEach(issuer => {
                translateProperties(issuer);
                issuer.faculty = faculty
            });
            issuers = faculty.publicIssuers;

            if (!faculty.image) {
                faculty.image = faculty.institution.image;
            }


            loaded = true;
        });
    });

</script>

<style lang="scss">
    div.page-container {
        width: 100%;
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

</style>
<div class="page-container">
    {#if !loaded}
        <Spinner/>
    {:else}
        <PublicBreadcrumb faculty={faculty}/>
        <BadgeClassHeader
                entity={entityType.ISSUER_GROUP}
                object={faculty}
                visitorRole={visitorRole}
                hasDescription={true}
                isPublic={true}
                entityId={entityId}>
            <section class="icons">
                {#if faculty.onBehalfOfUrl}
                    <div>
                        {@html globeIcon}
                        <a href={faculty.onBehalfOfUrl} target="_blank">{I18n.t("catalog.faculty.website")}</a>
                    </div>
                {/if}
            </section>
        </BadgeClassHeader>
        <PublicIssuers {issuers} institution={faculty}/>
    {/if}
</div>