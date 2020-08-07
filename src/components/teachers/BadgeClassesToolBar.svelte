<script>
  import I18n from "i18n-js";
  import {Search} from "../../components";
  import {search} from "../../stores/filterBadges";
  import {Field, MinimalisticSelect} from "../forms";

  export let awardFilter = false;

  let targetOptions = [
    {value: "recent", name: I18n.t("teacher.badgeclasses.mostRecent")},
    {value: "awarded", name: I18n.t("teacher.badgeclasses.mostAwarded")},
  ];
  export let sorting = targetOptions[0];

  const setBadgeFilter = filter => {
    awardFilter = filter;
  }

</script>

<style lang="scss">
  div {
    margin-top: 22px;
    margin-bottom: 22px;
  }

  .buttons {
    font-size: 24px;
    display: flex;
    align-items: center;
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
    width: 250px;
    margin-left: auto;
  }

  .sort {
    display: flex;
    align-items: center;
    label.title {
      display: inline-block;
      margin-right: 18px;
      font-weight: bold;
    }
  }

</style>

<div class="buttons">
  <span>
    <span class="badge-filter-button {awardFilter ? 'active' : 'inactive'}"
          on:click={() => setBadgeFilter(true)}>{I18n.t('teacher.badgeclasses.canAward')}</span>
    <span>|</span>
    <span class="badge-filter-button {awardFilter ? 'inactive' : 'active'}"
          on:click={() => setBadgeFilter(false)}>{I18n.t('teacher.badgeclasses.allBadges')}</span>
  </span>

  <span class="search">
    <Search bind:value={$search}/>
  </span>
</div>


<div class="sort">
  <label class="title">{I18n.t("models.badgeclass.sorting")}</label>
  <MinimalisticSelect
    bind:value={sorting}
    items={targetOptions}
    clearable={false}
    optionIdentifier="name"
  />

</div>
