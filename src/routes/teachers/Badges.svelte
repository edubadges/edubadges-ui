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

<style lang="scss">
  .page-container {
    display: flex;
  }

  .content {
    flex: 1;
    padding: 30px 20px;

    h2 {
      margin-bottom: 18px;
    }
  }

  .badges {
    --badge-margin-right: 20px;

    display: flex;
    flex-wrap: wrap;

    margin-right: calc(var(--badge-margin-right) * -1);
  }

  div.badge {
    display: flex;
    flex-direction: column;

    width: 260px;
    border: var(--card-border);
    border-radius: var(--card-border-radius);
    box-shadow: var(--card-shadow);
    margin-bottom: 20px;
    margin-right: var(--badge-margin-right);

    div.image {
      padding: 30px;
    }

    div.info {
      flex: 1;
      background: var(--color-background-grey-light);
      padding: var(--ver-padding-l) var(--hor-padding-s);

      h5 {
        color: var(--black);
      }
    }
  }
</style>

<div class="page-container">
  <SideBar />

  <div class="content">
    <h2>
      {I18n.t('teacher.badgeclasses.title')}
      {#if institution}in {institution.name}{/if}
    </h2>

    <div class="badges">
      {#each $tree.badgeClasses as badge (badge.entityId)}
        <div class="badge">
          <div class="image">
            <img src={badge.image} alt={`image for ${badge.name}`} />
          </div>
          <div class="info">
            <h3 class="text-black">{badge.name}</h3>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
