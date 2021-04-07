<script>
  import I18n from "i18n-js";
  import {FilterBlock} from "../../../components/teachers";
  import {awardTypes, issuedTypes, statusTypes} from "../../../stores/filterAssertions";

  export let assertions = [];
  export let filterAssertion;

  let issuedSelected = [];//[issuedTypes.LAST_30_DAYS];
  let awardTypeSelected = [];
  let statusSelected = [];

  const calculateIssuedOptions = allAssertions => {
    const options = allAssertions.reduce((acc, assertion) => {
        const item = acc.find(v => v.value === assertion.issued);
        if (item) {
          ++item.count;
        }
        return acc;
      },
      Object.keys(issuedTypes)
        .filter(issuedType => issuedType !== "ALL")
        .map(issuedType => ({
          name: I18n.t(`assertions.issued.${issuedType}`),
          value: issuedTypes[issuedType],
          count: 0
        })))
      .concat({
        name: I18n.t(`assertions.issued.ALL`),
        value: issuedTypes.ALL,
        count: assertions.length
      });
    [[issuedTypes.LAST_60_DAYS, issuedTypes.LAST_30_DAYS], [issuedTypes.LAST_90_DAYS, issuedTypes.LAST_60_DAYS]]
      .forEach(arr => {
        const days = options.find(item => item.value === arr[0]);
        const toAdd = options.find(option => option.value === arr[1]);
        days.count += toAdd.count
      });
    return options;
  }

  const calculateAwardTypeOptions = allAssertions => {
    return allAssertions.reduce((acc, assertion) => {
        const item = acc.find(v => v.value === (assertion.isDirectAward ? awardTypes.DIRECT_AWARD : awardTypes.REQUESTED));
        ++item.count;
        return acc;
      },
      Object.keys(awardTypes).map(type => ({
        name: I18n.t(`assertions.awardType.${type}`),
        value: awardTypes[type],
        count: 0
      })));
  }

  const calculateStatusOptions = allAssertions => {
    return allAssertions.reduce((acc, assertion) => {
      const item = acc.find(v => v.value === assertion.status);
      ++item.count;
      return acc;
    },
    Object.keys(statusTypes).map(type => ({
      name: I18n.t(`assertions.status.${type}`),
      value: statusTypes[type],
      count: 0
    })));
  }

  $: issuedOptions = calculateIssuedOptions(assertions);
  $: awardTypeOptions = calculateAwardTypeOptions(assertions);
  $: statusOptions = calculateStatusOptions(assertions);

  $: filterAssertion(issuedSelected, awardTypeSelected, statusSelected);

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
