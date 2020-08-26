<script>
  import I18n from "i18n-js";
  import {EntityHeaderTabs, HeaderList} from "../teachers";
  import {flash} from "../../stores/flash";
  import {userManagementIcon} from "../../icons";

  export let user;
  export let tabs;
  export let headerItems;
  export let title;
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

      .title {
        display: flex;
        flex-direction: row;
      }

      .list {
        margin: var(--ver-padding-m) 0;
        margin-left: 80px;
      }
    }
  }

  .svg-container {
    width: 30px;
    margin: 0 25px;
    color: var(--purple-8);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

</style>

<div class="entity">
  <div class="content">
    <div class="info">
      <div class="title">
        <div class="svg-container">
          {@html userManagementIcon}
        </div>
        {#if user}
          <h2>{I18n.t(['editUsers', 'permissions', 'headerUser'])} {user.firstName} {user.lastName}</h2>
        {:else if !title}
          <h2>{I18n.t(['editUsers', 'permissions', 'header'])}</h2>
        {:else}
          <h2>{title}</h2>
        {/if}
      </div>
      {#if user}
        <div class="list">
          <HeaderList entity="editUsers" {headerItems}/>
        </div>
      {/if}
    </div>
  </div>

  <EntityHeaderTabs {tabs}/>
</div>
