<script>
    import I18n from "i18n-js";
    import Spinner from "../../components/Spinner.svelte";
    import {onMount} from "svelte";
    import ViewSelector from "../../components/shared/ViewSelector.svelte";
    import BadgeListView from "../../components/shared/BadgeListView.svelte";
    import {createBadgeInstanceCollection} from "../../api";
    import Button from "../../components/Button.svelte";
    import {queryData} from "../../api/graphql";
    import {translateProperties} from "../../util/utils";
    import {ects, eqf, extensionValue, studyLoad, timeInvestment} from "../../components/extensions/badges/extensions";

    let loaded = false;
    let badgeInstanceCollections = [];
    let badges = [];
    let view = "cards";

    const query = `query {
      badgeInstanceCollections {
        entityId,
        name,
        public,
        description,
        badgeInstances {
          id
        }
      },
      badgeInstances {
        id,
        entityId,
        image,
        issuedOn,
        createdAt,
        public,
        revoked,
        expiresAt,
        acceptance,
        badgeclass {
          name,
          entityId,
          image,
          extensions {
            name,
            originalJson
          },
          issuer {
            nameDutch,
            nameEnglish,
            imageDutch,
            imageEnglish,
            faculty {
              nameDutch,
              nameEnglish,
              institution {
                nameDutch,
                nameEnglish,
              }
            }
          }
        }
      },
    }`

    onMount(() => {
        queryData(query).then(res => {
            const badgeInstances = res.badgeInstances;
            badgeInstances.forEach(badgeInstance => {
                const issuer = badgeInstance.badgeclass.issuer;
                translateProperties(issuer);
                translateProperties(issuer.faculty);
                translateProperties(issuer.faculty.institution);
            });
            badgeInstances.forEach(badge => {
                badge.badgeclass.studyLoad = extensionValue(badge.badgeclass.extensions, studyLoad);
                badge.badgeclass.timeInvestment = extensionValue(badge.badgeclass.extensions, timeInvestment);
                badge.badgeclass.ects = extensionValue(badge.badgeclass.extensions, ects);
                badge.badgeclass.eqf = extensionValue(badge.badgeclass.extensions, eqf);
            });
            badges = badgeInstances;
            badgeInstanceCollections = res.badgeInstanceCollections;
            loaded = true;
        })

    });

    const createCollection = () => {
        createBadgeInstanceCollection({
            name: "test", description: "Desss",
            badge_instances: [25, 27, 28], 'public': true
        });
    }

</script>

<style lang="scss">

  .header {
    display: flex;
    align-content: center;
  }

  h3 {
    font-size: 22px;
    margin-bottom: 30px;
  }

  div.content {
    &.cards {
      display: grid;
      grid-template-columns: 31% 31% 31%;
      grid-row: auto;
      grid-column-gap: 25px;
      grid-row-gap: 25px;
    }

    &.list {
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 1120px) {
    div.content.cards {
      grid-template-columns: 48% 48%;
    }
  }

  @media (max-width: 820px) {
    div.content.cards {
      grid-template-columns: 100%;
    }
  }
</style>

<div>
  <div class="header">
    <h3>{I18n.t('collections.title')}</h3>
    <ViewSelector bind:view={view}/>
  </div>
  {#if loaded}
    <div class={`content ${view === "list" ? "list" : "cards"}`}>
      {#if view === "list"}
        <BadgeListView badges={[]}/>
      {:else}
        {#each badgeInstanceCollections as collection}
          <!--          <BadgeCard badge={badge} badgeClass={badge.badgeclass} withHeaderData={true}/>-->
        {/each}
      {/if}
    </div>
    <Button action={createCollection} text={I18n.t("collections.create")}/>
  {:else}
    <Spinner/>
  {/if}
</div>
