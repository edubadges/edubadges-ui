<script>
    import I18n from "i18n-js";
    import {MinimalisticSelect} from "../forms";
    import ViewSelector from "../shared/ViewSelector.svelte";

    export let sortOptions;
    export let sorting;
    export let view;
    export let shareableFilter;

</script>

<style lang="scss">

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

  .sort-options {
    display: flex;
    align-items: center;
    width: 100%;

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
    <span class="badge-filter-button {shareableFilter ? 'active' : 'inactive'}"
          on:click={() => shareableFilter = true}>{I18n.t('collections.shareable')}</span>
    <span>|</span>
    <span class="badge-filter-button {shareableFilter ? 'inactive' : 'active'}"
          on:click={() => shareableFilter = false}>{I18n.t('collections.all')}</span>
  </span>
<ViewSelector bind:view={view}/>
</div>

<div class="sort-options">
  <div class="sort">
    <label class="title">{I18n.t("models.badgeclass.sorting")}</label>
    <MinimalisticSelect
      bind:value={sorting}
      items={sortOptions}
      clearable={false}
      optionIdentifier="name"/>
  </div>



</div>
