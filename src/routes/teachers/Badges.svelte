<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import I18n from "i18n-js";

  export let filteredBadgeIds;

  let badges = [];
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
    queryData(query).then(({ currentUser, badgeClasses }) => {
      badges = badgeClasses;
      institution = currentUser.institution;
    });
  });
</script>

<style>
  h2 span {
    color: var(--color-text-blue);
  }

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
    <span>in</span>
    {institution.name}
  {/if}
</h2>

<div class="badges">
  {#each badges.filter(badge =>
    filteredBadgeIds.includes(badge['entityId'])
  ) as badge}
    <div class="badge">
      <div class="image">
        <img src={badge.image} alt={`image for ${badge.name}`} />
      </div>
      <b>{badge.name}</b>
    </div>
  {/each}
</div>
