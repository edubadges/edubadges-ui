<script>
  import I18n from "i18n-js";
  import {FilterBlock} from "../../../components/teachers";

  export let issuedSelected = [];//[issuedTypes.LAST_30_DAYS];
  export let awardTypeSelected = [];
  export let statusSelected = [];

  export let issuedOptions = [];
  export let awardTypeOptions = [];
  export let statusOptions = [];

</script>

<style lang="scss">
  div.sidebar {
    width: var(--width-side-bar);
    padding: 15px var(--side-bar-alignment-h);
    background: var(--grey-2);

    h3 {
      margin-bottom: 8px;
    }

    > div {
      padding-bottom: 24px;

      &:not(:first-child) {
        padding-top: 24px;
        border-top: var(--card-border);
      }
    }
  }

  @media (max-width: 1120px) {
    div.sidebar {
      display: none;
    }
  }

</style>

<div class="sidebar">
  <div>
    <h3>{I18n.t('teacher.sidebar.filterAwards')}</h3>
  </div>

  <div>
    <FilterBlock
      bind:value={issuedSelected}
      collection={issuedOptions}
      objectIdentifier="value"
      title="issued"/>
  </div>

  <div>
    <FilterBlock
      bind:value={awardTypeSelected}
      collection={awardTypeOptions}
      objectIdentifier="value"
      title="awardType"/>
  </div>

  <div>
    <FilterBlock
      bind:value={statusSelected}
      collection={statusOptions}
      objectIdentifier="value"
      title="status"/>
  </div>

</div>
