<script>
  import I18n from "i18n-js";

  export let collection;
  export let value;
  export let title = "";

  let showExpand = false;
  let expanded = false;
  let maxLength = 5;

  $: showExpand = !value.length && collection.length > maxLength;
  $: items = expanded ? collection : collection.slice(0, maxLength);
</script>

<style>
  p {
    font-weight: bold;
  }

  .expand {
    color: var(--color-text-blue);
    text-decoration: underline;
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

{#each items as item (item.entityId)}
  <label
    class:active={value.includes(item.entityId)}
    class:inactive={value.length && !value.includes(item.entityId)}>
    <input type="checkbox" bind:group={value} value={item.entityId} />
    <span>{item.name}</span>
    ({item.count})
  </label>
{/each}

{#if showExpand}
  <label class="expand">
    <input type="checkbox" bind:checked={expanded} />
    {expanded ? I18n.t(`teacher.sidebar.filters.show_less`) : I18n.t(`teacher.sidebar.filters.show_all`)}
  </label>
{/if}
