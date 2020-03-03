<script>
  import { Badges } from "./teachers";
  import { SideBar } from "../components";

  import { requestProfile } from "../api";

  export let bookmark;

  let loaded = false;
  let user, faculties, issuers;

  const pages = [{ bm: "badges", component: Badges }];
  const currentPage = pages.find(({ bm }) => bm === bookmark) || pages[0];

  requestProfile()
    .then(res => {
      user = res;
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
  <SideBar {faculties} {issuers} />

  <div class="content">
    <svelte:component
      this={currentPage.component}
      scope={user.institution.name} />
  </div>
{/if}
