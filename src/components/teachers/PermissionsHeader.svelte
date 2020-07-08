<script>
  import I18n from "i18n-js";
  import {EntityHeaderTabs, HeaderList} from "../teachers";
  import {flash} from "../../stores/flash";

  export let user;
  export let tabs;
  export let headerItems;
</script>

<style lang="scss">
  .entity {
    padding: var(--ver-padding-m) var(--hor-padding-m) 0;
    background: var(--purple-1);

    .content {
      display: flex;
      margin-bottom: var(--ver-padding-m);

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .list {
        margin: var(--ver-padding-m) 0;
      }
    }
  }
</style>

<div class="entity">
  <div class="content">
    <div class="info">
      {#if user}
        <h2>{I18n.t(['editUsers', 'permissions', 'headerUser'])} {user.firstName} {user.lastName}</h2>
        <div class="list">
          <HeaderList entity="editUsers" {headerItems}/>
        </div>
      {:else}
        <h2>{I18n.t(['editUsers', 'permissions', 'header'])}</h2>
      {/if}
    </div>
  </div>

  <EntityHeaderTabs {tabs}/>
</div>
