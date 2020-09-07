<script>
  import I18n from "i18n-js";
  import {EntityHeaderTabs, HeaderList} from "../teachers";
  import {Button} from "../../components";
  import { requestBadge} from "../../api";
  import {role} from "../../util/role";
  import {flash} from "../../stores/flash";
  import {onMount} from "svelte";
  import RemoteImage from "../RemoteImage.svelte";
  import {entityType} from "../../util/entityTypes"
  import DOMPurify from 'dompurify';
  import marked from "marked";

  export let entity;
  export let object = {};
  export let mayUpdate;

  export let tabs;
  export let headerItems;
  export let visitorRole = role.TEACHER;

  let imageId = "";

</script>

<style lang="scss">
  .entity {
    padding: var(--ver-padding-m) var(--hor-padding-m) 0;
    background: var(--purple-1);

    .content {
      display: flex;
      margin-bottom: var(--ver-padding-m);

      .img-container {
        flex-shrink: 0;
        height: 120px;
        width: 120px;
        background: white;
        margin-right: var(--hor-padding-m);
        display: flex;
        justify-content: space-around;
      }

      .img-icon {
        height: 100px;
        width: 100px;
        background-color: white;
        align-self: center;
        display: flex;
        justify-content: space-around;
      }

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

  .actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto 0 auto calc(var(--hor-padding-xl) / 2);

    .button-container:first-child {
      margin-bottom: 15px;
    }
  }

  .slots {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto 0 auto calc(var(--hor-padding-xl) / 2);
  }

</style>

<div class="entity">
  <div class="content">
    {#if object.image}
      <div class="img-container">
        <div class="img-icon">
          <RemoteImage imageUrl={object.image} alt={`${object.name} logo`}/>
        </div>
      </div>
    {/if}
    <div class="info">
      <h2>{object.name}</h2>
      {#if object.publicLink}
        <p><a href={object.publicLink} target="_blank">{object.publicLink}</a></p>
      {/if}
      <div class="list">
        <HeaderList {entity} {headerItems}/>
      </div>
    </div>
    {#if visitorRole === role.TEACHER && mayUpdate}
      <div class="actions">
        <div class="button-container">
          <Button fill={true} disabled={!mayUpdate} secondary href="edit" text={I18n.t(['manage', 'edit', entity])}/>
        </div>
      </div>
    {/if}
    <div class="slots">
      <slot/>
    </div>
  </div>
  <EntityHeaderTabs {tabs}/>
</div>
