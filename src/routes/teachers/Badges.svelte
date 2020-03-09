<script>
  import { onMount, onDestroy } from "svelte";
  import I18n from "i18n-js";
  import { queryData } from "../../api/graphql";
  import {
    collection,
    filteredCollection,
    searchFilter,
    presenceFilters,
    resetFilterStores
  } from "../../stores/filter";

  export let searchText;
  export let facultyIdFilter;
  export let issuerIdFilter;

  let institution;

  const query = `{
      currentUser {
        institution {
          name
        }
      },
      badgeClasses {
        name,
        image,
        entityId,
        issuer {
          entityId,
          faculty {
            entityId
          }
        }
      }
    }`;

  onMount(() => {
    queryData(query).then(({ currentUser, badgeClasses }) => {
      $collection = badgeClasses;
      institution = currentUser.institution;
    });

    return () => resetFilterStores();
  });

  $: {
    $searchFilter = { attrs: ["name"], text: searchText };
    $presenceFilters = [
      {
        attr: "issuer.faculty.entityId",
        list: facultyIdFilter
      },
      {
        attr: "issuer.entityId",
        list: issuerIdFilter
      }
    ];
  }
</script>

<style>
  .badges {
    --badge-margin-right: 20px;

    display: flex;
    flex-wrap: wrap;

    margin-right: calc(var(--badge-margin-right) * -1);
  }

  div.badge {
    margin-bottom: 20px;
    margin-right: var(--badge-margin-right);
  }

  div.image {
    width: 200px;
    height: 200px;

    padding: 12px;
    margin-bottom: 6px;

    border: var(--card-border);
    border-radius: 7px;
  }
</style>

<h2>
  {I18n.t('teacher.badges.title')}
  {#if institution}
    <span class="blue-text">in</span>
    {institution.name}
  {/if}
</h2>

<div class="badges">
  {#each $filteredCollection as badge (badge.entityId)}
    <div class="badge">
      <div class="image">
        <img src={badge.image} alt={`image for ${badge.name}`} />
      </div>
      <b>{badge.name}</b>
    </div>
  {/each}
</div>
