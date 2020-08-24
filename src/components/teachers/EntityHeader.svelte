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
  import {institutionIcon, facultyIcon, issuerIcon} from "../../icons";

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

    .title {
      display: flex;
      margin-bottom: 20px;

      .logo {
        display: block;
        max-height: 36px;
        max-width: 36px;
        margin-right: 20px;
      }
    }


    .content {
      display: flex;
      margin-left: 56px;
      margin-bottom: var(--ver-padding-m);
      flex-wrap: wrap;

      .img-container {
        flex-shrink: 0;
        height: 100px;
        width: 100px;
        background: white;
        margin-right: var(--hor-padding-m);
        display: flex;
        justify-content: space-around;
      }

      .img-icon {
        height: 90px;
        width: 90px;
        background-color: white;
        align-self: center;
        display: flex;
        justify-content: space-around;
      }

      .icn-container {
        flex-shrink: 0;
        height: 100px;
        width: 100px;
        margin-right: var(--hor-padding-m);
        display: flex;
        justify-content: space-around;
      }

      .icn-icon {
        height: 90px;
        width: 90px;
        align-self: center;
        display: flex;
        justify-content: space-around;
      }

        .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 600px;
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
  <div class="title">
    <span class="logo">{@html
      entity === entityType.INSTITUTION ? institutionIcon :
      entity === entityType.ISSUER_GROUP ? facultyIcon :
      entity === entityType.ISSUER ? issuerIcon : ''
    }</span>
    <span><h2>{object.name}</h2></span>
  </div>
  <div class="content">
    {#if object.image}
      <div class="img-container">
        <div class="img-icon">
          <RemoteImage imageUrl={object.image} alt={`${object.name} logo`}/>
        </div>
      </div>
    {:else if entity === entityType.ISSUER}
      <div class="icn-container">
        <div class="icn-icon">
        <span class="icon">
          {@html issuerIcon}
        </span>
        </div>
      </div>
    {/if}
    <div class="info">
      {#if entity !== entityType.BADGE_CLASS}
        <p>{object.description}</p>
      {/if}
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
