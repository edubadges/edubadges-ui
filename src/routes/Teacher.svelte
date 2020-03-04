<script>
  import I18n from "i18n-js";
  import { Badges } from "./teachers";
  import { SideBar } from "../components";
  import {
    getTeacherBadges,
    requestProfile,
    getFaculties,
    getIssuers, getIssuer
  } from "../api";
  import {collectFilters, filteredData, filterCounts, toggleFilter} from "../util/filterFunctions";

  export let bookmark;

  let loaded = false;
  let user, teacherBadgesData, faculties, issuers;

  let visibleBadgeIds = [];
  const filterAttributes = ["Issuer Group", "Issuer"];

  const pages = [{ bm: "badges", component: Badges }];
  const currentPage = pages.find(({ bm }) => bm === bookmark) || pages[0];

  let badges;

  const apiCalls = [
    requestProfile(),
    getTeacherBadges(),
    getFaculties(),
    getIssuers()
  ];
  Promise.all(apiCalls)
      .then(values => {
        [user, teacherBadgesData, faculties, issuers] = values;
        for (const badge of teacherBadgesData) {
            const issuerSlug = badge.issuer.split('/').pop();
            getIssuer(issuerSlug).then(issuerData => {
                badge['Issuer Group'] = issuerData['faculty']['name'];
                badge['Issuer'] = issuerData['name'];
                setTimeout(() => loaded = true, 100)  // TODO
            })
        }
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
  <SideBar
      bind:filteredBadges={badges}
      institution={user.institution.name}
      filterSubject={I18n.t('teacher.' + currentPage.bm + '.title')}
      {teacherBadgesData}
      {filterAttributes} />

  <div class="content">
    <svelte:component
      this={currentPage.component}
      title={I18n.t('teacher.' + currentPage.bm + '.title')}
      scope={user.institution.name}
      bind:filteredBadges={badges} />
  </div>
{/if}
