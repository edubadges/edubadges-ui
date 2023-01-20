<script>
    import {onMount} from "svelte";
    import {SideMenu} from "../components/students";
    import security from "../icons/security.svg";
    import data_activity from "../icons/data_activity.svg";
    import personal_info from "../icons/personal_info.svg";
    import archived_svg from "../icons/archive-svgrepo-com.svg";
    import award from "../icons/award-ribbon-star-1.svg";
    import import_svg from "../icons/import.svg";
    import {config} from "../util/config";
    import {Archived, Backpack, BadgeRequests, ImportedBadges, Profile} from "./students";
    import Collections from "./students/Collections.svelte";

    export let bookmark;
    export let revalidateName;

    let pages = [
        {path: "backpack", icon: data_activity, component: Backpack},
        {path: "badge-requests", icon: security, component: BadgeRequests},
        {path: "collections", icon: award, component: Collections},
        {path: "import", icon: import_svg, component: ImportedBadges},
        {path: "archived", icon: archived_svg, component: Archived},
        {path: "profile", icon: personal_info, component: Profile}
    ];
    if (!config.importBadgeAllowed) {
        pages = pages.filter(page => page.path !== "import");
    }

    let currentPage = pages[0];
    let showContent = true;

    onMount(() => {
        currentPage = pages.find(({path}) => path === bookmark) || pages[0];
    });
</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex: 1;
  }

  .content {
    flex: 1;
    padding: 30px 20px;

    &.hide-content {
      display: none;
    }
  }
</style>

<div class="page-container">
    <SideMenu {pages} {currentPage} toggle={() => showContent = !showContent}/>
    <div class="content" class:hide-content={!showContent}>
        <svelte:component this={currentPage.component} {revalidateName}/>
    </div>
</div>
