<script>
  import I18n from "i18n-js";

  export let collection;
  export let value;
  export let count;
  export let title = "";
</script>

<style>
  p {
    font-weight: bold;
  }

  input[type="checkbox"] {
    display: none;
  }

  label {
    display: block;
    margin: 12px 0;
    cursor: pointer;
    position: relative;
  }

  label:not(.active) span {
    text-decoration: underline;
  }

  label.active {
    background: white;
    padding: 8px;
    border: var(--card-border);
  }

  label.inactive {
    display: none;
  }
</style>

<p>{I18n.t(`teacher.sidebar.filters.${title}`)}</p>

{#each collection as item (item.entityId)}
  <label
    class:active={value.includes(item.entityId)}
    class:inactive={value.length && !value.includes(item.entityId)}>
    <input type="checkbox" bind:group={value} value={item.entityId} />
    <span>{item.name}</span>
    ({count(item)})
  </label>
{/each}
