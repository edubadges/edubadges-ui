<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { queryData } from "../../api/graphql";

  export let searchText;

  let badges = [];
  let filteredBadges = [];
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
        entityId
      }
    }`;

  onMount(() => {
    queryData(query).then(({ badgeClasses, currentUser }) => {
      badges = badgeClasses;
      filteredBadges = badgeClasses;
      institution = currentUser.institution;
    });
  });

  $: if (searchText) {
    filteredBadges = badges.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
  } else {
    filteredBadges = badges;
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
  {#each filteredBadges as badge (badge.entityId)}
    <div class="badge">
      <div class="image">
        <img src={badge.image} alt={`image for ${badge.name}`} />
      </div>
      <b>{badge.name}</b>
    </div>
  {/each}
</div>
