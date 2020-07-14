<script>
  import I18n from "i18n-js";
  import { Search } from "../../components";
  import { search } from "../../stores/filterBadges";
  import { Field, Select } from "../forms";

  export let awardFilter = false;
  let targetOptions = [
    {value: "recent", name: "Most recent"},
    {value: "awarded", name: "Most awarded"},
  ];
  export let sorting = targetOptions[0];

  const setBadgeFilter = filter => {
    awardFilter = filter;
  }
</script>

<style>
  div {
    margin-top: 22px;
    margin-bottom: 22px;
  }

  #buttons {
    font-size: 24px;
    overflow: auto;
  }

  .badge-filter-button {
    font-family: "Proxima Nova Soft", sans-serif;
    border: none;
    background-color: inherit;
    font-size: 20px;
    padding: 0;
    margin-left: 5px;
    margin-right: 5px;
    color: var(--text-grey-dark);
  }

  .active {
    font-weight: var(--semi-bold);
  }

  .inactive {
    font-weight: normal;
  }

  #search {
    width: 250px;
    float: right;
  }
</style>

<div id="buttons">
  <span>
    <button class="badge-filter-button {awardFilter ? 'active' : 'inactive'}" on:click={() => setBadgeFilter(true)}>{I18n.t('teacher.badgeclasses.canAward')}</button>
    |
    <button class="badge-filter-button {awardFilter ? 'inactive' : 'active'}" on:click={() => setBadgeFilter(false)}>{I18n.t('teacher.badgeclasses.allBadges')}</button>
  </span>

  <span id="search">
    <Search bind:value={$search} />
  </span>
</div>

<div>
  <Field entity={'badgeclass'} attribute={'sorting'}>
    <Select
        bind:value={sorting}
        items={targetOptions}
        clearable={false}
        optionIdentifier="name"
    />
  </Field>
</div>
