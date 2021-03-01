<script>
  import {onMount} from "svelte";
  import {SideMenu} from "../components/students";
  import security from "../icons/security.svg";
  import data_activity from "../icons/data_activity.svg";
  import personal_info from "../icons/personal_info.svg";

  import {Backpack, BadgeRequests, Profile} from "./students";

  export let bookmark;

  const pages = [
    {path: "backpack", icon: data_activity, component: Backpack},
    {path: "badge-requests", icon: security, component: BadgeRequests},
    {path: "profile", icon: personal_info, component: Profile}
  ];

  let currentPage = pages[0];

  onMount(() => {
    currentPage = pages.find(({path}) => path === bookmark) || pages[0];
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
</style>

<div class="page-container">
  <SideMenu {pages} {currentPage}/>
  <div class="content">
    <svelte:component this={currentPage.component}/>
  </div>
</div>
