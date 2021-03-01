<script>
  import I18n from "i18n-js";
  import {Search} from "../../components";
  import {awardFilter, facultyIds, issuerIds, search, tree} from "../../stores/filterBadges";
  import {MinimalisticSelect} from "../forms";
  import ViewSelector from "../shared/ViewSelector.svelte";
  import {sortTargetOptions} from "../../util/catalogFilters";

  export let sorting;
  export let view;

  const setBadgeFilter = filter => {
    $awardFilter = filter;
    if ($issuerIds[0]) {
      if (!$tree.issuers.some(issuer => issuer.entityId === $issuerIds[0] && issuer.count > 0)) {
        $issuerIds.length = 0;
      }
    }
    if ($facultyIds[0]) {
      if (!$tree.faculties.some(faculty => faculty.entityId === $facultyIds[0] && faculty.count > 0)) {
        $facultyIds.length = 0;
      }
    }
  }

</script>

<style lang="scss">

  .buttons {
    font-size: 24px;
    display: flex;
    align-items: center;
    margin-top: 15px;
  }

  .badge-filter-button {
    font-family: "Proxima Nova Soft", sans-serif;
    border: none;
    background-color: inherit;
    font-size: 20px;
    padding: 0;
    margin: 0 10px 0 0;

    &:last-child {
      margin: 0 0 0 10px;
    }

    color: var(--text-grey-dark);
    cursor: pointer;

    &.active {
      cursor: default;
    }
  }

  .active {
    font-weight: var(--semi-bold);
  }

  .inactive {
    font-weight: normal;
  }

  .search {
    width: 400px;
    margin-left: auto;
  }

  .sort-options {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 15px 0 20px 0;

    .sort {
      display: flex;
      align-items: center;

      label.title {
        display: inline-block;
        margin-right: 18px;
        font-weight: bold;
      }
    }

  }

</style>

<div class="buttons">
  <span>
    <span class="badge-filter-button {$awardFilter ? 'active' : 'inactive'}"
          on:click={() => setBadgeFilter(true)}>{I18n.t('teacher.badgeclasses.canAward')}</span>
    <span>|</span>
    <span class="badge-filter-button {$awardFilter ? 'inactive' : 'active'}"
          on:click={() => setBadgeFilter(false)}>{I18n.t('teacher.badgeclasses.allBadges')}</span>
  </span>

  <span class="search">
    <Search bind:value={$search}/>
  </span>
</div>

<div class="sort-options">
  <div class="sort">
    <label class="title">{I18n.t("models.badgeclass.sorting")}</label>
    <MinimalisticSelect
      bind:value={sorting}
      items={sortTargetOptions()}
      clearable={false}
      optionIdentifier="name"/>
  </div>

  <ViewSelector bind:view={view}/>

</div>
