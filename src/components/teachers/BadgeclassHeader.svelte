<script>
  import I18n from "i18n-js";
  import { Link } from "svelte-routing";
  import { EntityHeaderTabs } from "../teachers";

  export let badgeclass = {};
  export let tabs;
</script>

<style>
  .entity {
    padding: var(--ver-padding-m) var(--hor-padding-m) 0;
    background: var(--color-background-grey-light);
    display: flex;
  }

  .img-container,
  .info {
    margin-bottom: var(--ver-padding-m);
    margin-right: var(--hor-padding-m);
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .info {
    flex: 1;
  }

  .img-container {
    flex-shrink: 0;
    height: 150px;
    width: 150px;
    background: white;
  }

  img {
    width: 100%;
    height: 100%;
  }
</style>

<div class="entity">
  <div class="img-container">
    <img src={badgeclass.image} alt="badge image" />
  </div>

  <div class="content">
    <div class="info">
      <h3>{badgeclass.name}</h3>
      <p>{badgeclass.description}</p>
    </div>

    <EntityHeaderTabs {tabs} />
  </div>
</div>
