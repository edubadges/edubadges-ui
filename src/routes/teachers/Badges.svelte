<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { SideBar } from "../../components/teachers";
  import { queryData } from "../../api/graphql";
  import { faculties, tree } from "../../stores/filter";

  let institution;

  const query = `{
    currentUser {
      institution {
        name
      }
    },
    faculties {
      name,
      entityId,
      issuers {
        name,
        entityId,
        badgeclasses {
          name,
          image,
          entityId
        }
      },
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institution = res.currentUser.institution;
      $faculties = res.faculties;
    });
  });
</script>

<style>
  .page-container {
    display: flex;
    flex: 1;
  }

  .content {
    flex: 1;
    padding: 30px 20px;
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

<div class="page-container">
  <SideBar />

  <div class="content">
    <h2>
      {I18n.t('teacher.badgeclasses.title')}
      {#if institution}
        <span class="blue-text">in</span>
        {institution.name}
      {/if}
    </h2>

    <div class="badges">
      {#each $tree.badgeClasses as badge (badge.entityId)}
        <div class="badge">
          <div class="image">
            <img src={badge.image} alt={`image for ${badge.name}`} />
          </div>
          <b>{badge.name}</b>
        </div>
      {/each}
    </div>
  </div>
</div>
