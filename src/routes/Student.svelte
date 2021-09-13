<script>
    import {onMount} from "svelte";
    import {SideMenu} from "../components/students";
    import security from "../icons/security.svg";
    import data_activity from "../icons/data_activity.svg";
    import personal_info from "../icons/personal_info.svg";
    import archived_svg from "../icons/archive-svgrepo-com.svg";

    import {Archived, Backpack, BadgeRequests, Profile} from "./students";
    import Collections from "./students/Collections.svelte";

    export let bookmark;

    const pages = [
        {path: "backpack", icon: data_activity, component: Backpack},
        {path: "badge-requests", icon: security, component: BadgeRequests},
        {path: "collections", icon: archived_svg, component: Collections},
        {path: "archived", icon: archived_svg, component: Archived},
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
