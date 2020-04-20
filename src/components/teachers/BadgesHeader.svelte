<script>
  import I18n from "i18n-js";
  export let entity = {};
</script>

<style>
  h2 {
    margin-bottom: var(--ver-padding-m);
  }

  .header {
    background: var(--purple-1);
    border-left: 2px solid var(--purple-3);

    padding: var(--ver-padding-m) var(--hor-padding-m);
    margin-bottom: var(--ver-padding-l);

    display: flex;
  }

  .image {
    height: 100px;
    width: 100px;
    background: white;
    padding: 5px;
    margin-right: var(--hor-padding-m);
  }
</style>

<h2>
  {I18n.t('teacher.badgeclasses.title')}
  {#if entity}in {entity.name}{/if}
</h2>
<div class="header">
  {#if entity.image}
    <div class="image">
      <img src={entity.image} alt={`${entity.name} logo`} />
    </div>
  {/if}
  {entity.description}
</div>
