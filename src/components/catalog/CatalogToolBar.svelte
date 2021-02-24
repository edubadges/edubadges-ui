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

<div class="search">
  <span class="search">
    <Search bind:value={$search}/>
  </span>
</div>

<ViewSelector bind:view={view}/>

<div class="sort-options">
  <div class="sort">
    <label class="title">{I18n.t("models.badgeclass.sorting")}</label>
    <MinimalisticSelect
      bind:value={sorting}
      items={sortTargetOptions()}
      clearable={false}
      optionIdentifier="name"/>
  </div>



</div>
