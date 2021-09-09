<script>
    import I18n from "i18n-js";
    import {Search} from "../../components";
    import {search} from "../../stores/filterCatalog";
    import {MinimalisticSelect} from "../forms";
    import ViewSelector from "../shared/ViewSelector.svelte";
    import {sortTargetOptions} from "../../util/catalogFilters";

    export let sorting = sortTargetOptions()[0];
    export let view;

</script>

<style lang="scss">
  .catalog-toolbar {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }

  .search {
    width: 460px;
  }

  .view-selector {
    margin-right: 25px;
  }

  .sort-options {
    display: flex;
    align-items: center;
    margin-left: auto;

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

  @media (max-width: 1120px) {
    .catalog-toolbar {
      flex-direction: column;
      align-items: flex-start;
    }

    .sort-options {
      margin-left: 0;
      margin-top: 15px;
    }
  }


</style>
<div class="catalog-toolbar">
  <div class="search">
  <span class="search">
    <Search bind:value={$search} limitWidth={false}/>
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
    <div class="view-selector">
      <ViewSelector bind:view={view}/>
    </div>


  </div>

</div>
