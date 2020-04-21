<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { SideBar, BadgesHeader } from "../../components/teachers";
  import { queryData } from "../../api/graphql";
  import { headerEntity, headerStaff } from "../../api/queries";
  import { faculties, tree } from "../../stores/filter";

  const query = `{
    faculties {
      ${headerEntity},
      ${headerStaff},
      issuers {
        ${headerEntity},
        image,
        ${headerStaff},
        badgeclasses {
          name,
          image,
          entityId
        }
      },
    }
  }`;

  onMount(() => {
    queryData(query).then(res => ($faculties = res.faculties));
  });
</script>

<style lang="scss">
  .page-container {
    display: flex;
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
    display: flex;
    flex-direction: column;

    width: 260px;
    margin-bottom: 20px;
    margin-right: var(--badge-margin-right);

    div.image {
      padding: 30px;
    }

    div.info {
      flex: 1;
      background: var(--grey-2);
      padding: var(--ver-padding-l) var(--hor-padding-s);

      h3 {
        color: var(--black);
      }
    }
  }
</style>

<div class="page-container">
  <SideBar />

  <div class="content">
    <BadgesHeader />

    <div class="badges">
      {#each $tree.badgeClasses as badge (badge.entityId)}
        <div
          class="card badge click"
          on:click={() => navigate(`/badgeclasses/${badge.entityId}`)}>
          <div class="image">
            <img src={badge.image} alt={`image for ${badge.name}`} />
          </div>
          <div class="info">
            <h3>{badge.name}</h3>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
