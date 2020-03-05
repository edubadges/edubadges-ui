<script>
  import { Badges } from "./teachers";
  import { SideBar } from "../components";
  import I18n from "i18n-js";

  export let bookmark;

  const pages = [{ bm: "badges", component: Badges }];
  const currentPage = pages.find(({ bm }) => bm === bookmark) || pages[0];

  let filteredBadgeIds = [];

  let institutionName = '';
</script>

<style>
  .content {
    flex: 1;
    padding: 30px 20px;
  }
</style>

<SideBar
    institution={institutionName}
    filterSubject={I18n.t('teacher.' + currentPage.bm + '.title')}
    bind:filteredBadgeIds={filteredBadgeIds}
/>

<div class="content">
    <svelte:component
        this={currentPage.component}
        title={I18n.t('teacher.' + currentPage.bm + '.title')}
        scope={institutionName}
        bind:filteredBadgeIds={filteredBadgeIds}
    />
</div>
