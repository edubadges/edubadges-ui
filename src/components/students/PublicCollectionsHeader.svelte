<script>
    import {onMount} from "svelte";
    import badgeCollections from "../../icons/badge-collections.svg";
    import {HeaderList} from "../teachers";

    export let badgeInstanceCollection = {};

    let headerItems = [];

    onMount(() => {
        headerItems = [{
            attr: "createdAt",
            value: badgeInstanceCollection.createdAt,
            type: "date"
        }]
    });

</script>

<style lang="scss">
  h2 {
    margin-bottom: var(--ver-padding-m);
  }

  .header {
    background: var(--purple-1);
    border-left: 2px solid var(--purple-3);

    padding: var(--ver-padding-m) var(--hor-padding-m);
    margin-bottom: var(--ver-padding-l);

    display: flex;

    .collections-icon-container {
      height: 120px;
      width: 120px;
      margin-right: 15px;
    }

    :global(.collections-icon-container svg) {
      height: 120px;
      width: 120px;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        margin-bottom: var(--ver-padding-m);
      }
    }
  }
</style>

<h2>
  {badgeInstanceCollection.name}
</h2>
<div class="header">
  <div class="collections-icon-container">
    {@html badgeCollections}
  </div>
  <div class="content">
    <p>{badgeInstanceCollection.description}</p>
    <HeaderList {headerItems} entity="collections"/>
  </div>
</div>
