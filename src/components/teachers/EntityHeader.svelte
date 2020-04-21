<script>
  import I18n from "i18n-js";
  import { EntityHeaderTabs, HeaderList } from "../teachers";
  import { Button } from "../../components";
  import { requestBadge } from "../../api";
  import { role } from "../../util/role";

  export let entity;
  export let object = {};
  export let mayUpdate;
  export let tabs;
  export let headerItems;
  export let visitorRole;
  export let enrolled;
  export let entityId;

  const enrollStudent = () => {
    requestBadge(entityId).then(res => {

    }, err => {
      console.error('error while enrolling', err);
    });
  };

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
        height: 100px;
        width: 100px;
        background: white;
        margin-right: var(--hor-padding-m);
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
</style>

<div class="entity">
  <div class="content">
    {#if object.image}
      <div class="img-container">
        <img src={object.image} alt={`${object.name} logo`} />
      </div>
    {/if}

    <div class="info">
      <h2>{object.name}</h2>
      <p>{object.description}</p>

      <div class="list">
        <HeaderList {entity} {headerItems} />
      </div>
    </div>

    {#if visitorRole === role.STUDENT}
      {#if !enrolled}
        <Button secondary action={enrollStudent} text="enroll" class="btn" />
      {:else}
        <Button label="alreadyEnrolled" text="already enrolled"/>
      {/if}
    {/if}
    {#if mayUpdate}
      <Button secondary href="edit" text={I18n.t(['manage', 'edit', entity])} />
    {/if}
  </div>

  <EntityHeaderTabs {tabs} />
</div>
