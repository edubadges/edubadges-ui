<script>
  import { Badges } from "./teachers";
  import { SideBar } from "../components";
  import {
      getTeacherBadges,
      requestProfile,
      getFaculties,
      getIssuers
  } from "../api";

  export let bookmark;

  let loaded = false;
  let user, badges, faculties, issuers;

  let visibleBadgeIds = [];

  const pages = [{ bm: "badges", component: Badges }];
  const currentPage = pages.find(({ bm }) => bm === bookmark) || pages[0];

  const apiCalls = [
    requestProfile(),
    getTeacherBadges(),
    getFaculties(),
    getIssuers()
  ];
  Promise.all(apiCalls)
      .then(values => {
        [user, badges, faculties, issuers] = values;
        loaded = true;
      })
      .catch(error => console.log(error));
</script>

<style>
  .content {
    flex: 1;
    padding: 30px 20px;
  }
</style>

{#if loaded}
  <SideBar {badges} bind:value={visibleBadgeIds}  {faculties} {issuers} />

  <div class="content">
    <svelte:component
      this={currentPage.component}
      scope={user.institution.name}
      {visibleBadgeIds}
      {badges} />
  </div>
{/if}
