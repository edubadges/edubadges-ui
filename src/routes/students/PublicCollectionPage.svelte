<script>
    import Spinner from "../../components/Spinner.svelte";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import {translateProperties} from "../../util/utils";
    import {ects, eqf, extensionValue, studyLoad, timeInvestment} from "../../components/extensions/badges/extensions";
    import CollectionsHeader from "../../components/students/CollectionsHeader.svelte";
    import CollectionsToolBar from "../../components/students/CollectionsToolBar.svelte";
    import CollectionCard from "../../components/students/CollectionCard.svelte";
    import PublicCollectionsHeader from "../../components/students/PublicCollectionsHeader.svelte";

    export let entityId;

    let loaded = false;
    let badgeInstanceCollection = {};
    let view = "cards";

    const queryBadgeInstance = `query ($entityId: String) {
      badgeInstanceCollection(id: $entityId) {
        entityId,
        name,
        public,
        description,
        createdAt,
        publicBadgeInstances {
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
      }
    }`;

    const refresh = () => {
        loaded = false;
        queryData(queryBadgeInstance, {entityId}).then(res => {
            const badgeInstances = res.badgeInstanceCollection.publicBadgeInstances;
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
            res.badgeInstanceCollection.badgeInstances = res.badgeInstanceCollection.publicBadgeInstances;
            badgeInstanceCollection = res.badgeInstanceCollection;
            loaded = true;
        })
    }

    onMount(refresh);
</script>

<style lang="scss">
  div.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 25px;
  }

  div.content {
    display: flex;
    flex-direction: column;
  }

</style>


{#if loaded}
  <div class="container">
    <PublicCollectionsHeader {badgeInstanceCollection}/>
    <CollectionsToolBar readOnly={true} bind:view={view}/>
    <div class="content">
      <CollectionCard collection={badgeInstanceCollection} view={view} readOnly={true}/>
    </div>
  </div>
{:else}
  <Spinner/>
{/if}
