<script>
  import {onMount} from "svelte";
  import {navigate} from "svelte-routing";
  import {SideBarBadges, BadgesHeader} from "../../components/teachers";
  import {queryData} from "../../api/graphql";
  import {headerEntity, headerStaff} from "../../api/queries";
  import {faculties, tree} from "../../stores/filterBadges";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";

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
          entityId,
          issuer {
            name,
            image,
            faculty {
              name
            }
          }
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

  div.badges {
    --badge-margin-right: 20px;

    display: grid;
    grid-template-columns: 31% 31% 31%;
    grid-row: auto;
    grid-column-gap: 25px;
    grid-row-gap: 25px;
    margin-right: calc(var(--badge-margin-right) * -1);
  }

  @media (max-width: 1120px) {
    div.badges {
      grid-template-columns: 48% 48%;
    }
  }

  @media (max-width: 820px) {
    div.badges {
      grid-template-columns: 97%;
    }
  }


</style>

<div class="page-container">
  <SideBarBadges/>

  <div class="content">
    <BadgesHeader/>

    <div class="badges">
      {#each $tree.badgeClasses as badge}
        <BadgeCard badgeClass={badge}/>
      {/each}
    </div>
  </div>
</div>
