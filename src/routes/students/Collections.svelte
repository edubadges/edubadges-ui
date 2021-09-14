<script>
    import I18n from "i18n-js";
    import Spinner from "../../components/Spinner.svelte";
    import {onMount} from "svelte";
    import {createBadgeInstanceCollection} from "../../api";
    import Button from "../../components/Button.svelte";
    import {queryData} from "../../api/graphql";
    import {translateProperties} from "../../util/utils";
    import {ects, eqf, extensionValue, studyLoad, timeInvestment} from "../../components/extensions/badges/extensions";
    import CollectionsHeader from "../../components/students/CollectionsHeader.svelte";
    import CollectionsToolBar from "../../components/students/CollectionsToolBar.svelte";
    import CollectionCard from "../../components/students/CollectionCard.svelte";

    const sortOptions = [
        {value: "recent", name: I18n.t("collections.byRecent")},
        {value: "size", name: I18n.t("collections.bySize")},
        {value: "name", name: I18n.t("collections.byName")},
    ]

    let loaded = false;
    let badgeInstanceCollections = [];
    let view = "cards";
    let shareableFilter = true;
    let sorting = sortOptions[0];

    const query = `query {
      badgeInstanceCollections {
        entityId,
        name,
        public,
        description,
        createdAt,
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

    const refresh = () => {
        loaded = false;
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
            res.badgeInstanceCollections.forEach(collection => {
                collection.badgeInstances = collection.badgeInstances.map(bi => badgeInstances.find(b => b.id === bi.id));
            });
            badgeInstanceCollections = res.badgeInstanceCollections;
            if (badgeInstanceCollections.filter(coll => coll.public).length === 0) {
                shareableFilter = false;
            }
            loaded = true;
        })
    }

    onMount(refresh);

    const createCollection = () => {
        createBadgeInstanceCollection({
            name: "test 12345", description: "Desss !!!!",
            badge_instances: [25, 28], 'public': false
        });
    }

    $: filteredAndSortedCollections = badgeInstanceCollections.filter(coll => shareableFilter ? coll.public : true).sort((a, b) => {
        switch (sorting) {
            case "recent": {
                return new Date(b.createdAt) - new Date(a.createdAt)
            }
            case "size": {
                return a.badgeInstances.length - b.badgeInstances.length;
            }
            case "name": {
                return a.name.localeCompare(b.name)
            }
        }
    })

</script>

<style lang="scss">
  div.container {
    display: flex;
    flex-direction: column;
  }

  div.content {
    display: flex;
    flex-direction: column;
  }

</style>

<div>
  {#if loaded}
    <div class="container">
      <CollectionsHeader {badgeInstanceCollections}>
        <Button action={createCollection} text={I18n.t("collections.create")}/>
      </CollectionsHeader>
      {#if badgeInstanceCollections.length === 0}
        <p>{I18n.t("collections.zeroState")}</p>
      {:else}
        <CollectionsToolBar bind:shareableFilter={shareableFilter} bind:sorting={sorting} bind:view={view}
                            sortOptions={sortOptions}/>
        <div class="content">
          {#each filteredAndSortedCollections as collection}
            <CollectionCard collection={collection} view={view} refresh={refresh}/>
          {/each}
        </div>
      {/if}
    </div>
  {:else}
    <Spinner/>
  {/if}
</div>
