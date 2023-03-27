<script>
  import I18n from "i18n-js";
  import {FilterBlock} from "../../components/teachers";
  import {
    tree,
    badgeClassSelected,
    facultySelected,
    issuerSelected
  } from "../../stores/filterUnclaimedDirectAwards";
</script>

<style lang="scss">
  div.sidebar {
    border-top-left-radius: var(--card-border-radius);
    border-bottom-left-radius: var(--card-border-radius);
    width: var(--width-side-bar);
    padding: var(--side-bar-alignment-v) var(--side-bar-alignment-h);
    background: var(--grey-2);
    max-width: 270px;

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
    <h3>{I18n.t('teacher.sidebar.filterDirectAwards')}</h3>
  </div>

    <div>
      <FilterBlock
        bind:value={$facultySelected}
        collection={$tree.faculties}
        maxLength={5}
        title="faculties"/>
    </div>

    <div>
      <FilterBlock
        bind:value={$issuerSelected}
        collection={$tree.issuers}
        maxLength={5}
        title="issuers"/>
    </div>

    <div>
      <FilterBlock
        bind:value={$badgeClassSelected}
        collection={$tree.badgeClasses}
        maxLength={5}
        title="badgeClasses"/>
    </div>

</div>
