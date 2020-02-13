<script>
    import {getBadges} from "../../api";

    export let bookmark;

  import { onMount } from "svelte";
  import { SideMenu } from "../../components";
  import security from "../../icons/security.svg";
  import data_activity from "../../icons/data_activity.svg";
  import personal_info from "../../icons/personal_info.svg";

  import { Backpack, BadgeRequests, Collections, Profile } from "../student";

  const pages = [
    { path: "backpack", icon: data_activity, component: Backpack },
    { path: "badge-requests", icon: security, component: BadgeRequests },
    { path: "collections", icon: data_activity, component: Collections },
    { path: "profile", icon: personal_info, component: Profile }
  ];

  let currentPage = pages[0];

  onMount(() => {
    currentPage = pages.find(({ path }) => path === bookmark) || pages[0];
        currentPage = pages.find(({path}) => path === bookmark) || pages[0];
    });
</script>

<style>
  .content {
    padding: 30px 20px;
  }
</style>

<SideMenu {pages} {currentPage} />
<div class="content">
  <svelte:component this={currentPage.component}/>
</div>
