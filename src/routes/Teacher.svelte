<script>
  import { onMount } from "svelte";
  import { Badges } from "./teachers";
  import { SideBar } from "../components";
  import { getTeacherBadges, requestProfile, getFaculties } from "../api";

  export let bookmark;

  let loaded = false;
  let user;
  let badges;
  let faculties;

  const pages = [{ bm: "badges", component: Badges }];
  const currentPage = pages.find(({ bm }) => bm === bookmark) || pages[0];

  const apiCalls = [requestProfile(), getTeacherBadges(), getFaculties()];
  Promise.all(apiCalls)
    .then(values => {
      [user, badges, faculties] = values;
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
  <SideBar {faculties} />

  <div class="content">
    <svelte:component
      this={currentPage.component}
      scope={user.institution.name}
      {badges} />
  </div>
{/if}
