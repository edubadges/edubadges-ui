<script>
  import I18n from "i18n-js";
  import close from "../../icons/close_smll.svg";

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
    position: relative;
  }

  label:not(.active) span {
    text-decoration: underline;
  }

  label.active {
    background: white;
    padding: 8px;
    border: var(--card-border);

    display: flex;
  }

  label.active div {
    flex: 1;
    margin-right: 5px;
  }

  :global(label.active svg) {
    --close-filter-size: 18px;
    width: var(--close-filter-size);
    height: var(--close-filter-size);
    margin: auto;
    border: 1px solid black;
    border-radius: 50%;
  }

  label.inactive {
    display: none;
  }
</style>

<p>{I18n.t(`teacher.sidebar.filters.${title}`)}</p>

{#each items as item (item.entityId)}
  <label
    class="click"
    class:active={value.includes(item.entityId)}
    class:inactive={value.length && !value.includes(item.entityId)}>
    <input type="checkbox" bind:group={value} value={item.entityId} />
    <div>
      <span>{item.name}</span>
      ({item.count})
    </div>
    {#if value.includes(item.entityId)}
      {@html close}
    {/if}
  </label>
{/each}

{#if showExpand}
  <label class="click expand">
    <input type="checkbox" bind:checked={expanded} />
    {expanded ? I18n.t(`teacher.sidebar.filters.show_less`) : I18n.t(`teacher.sidebar.filters.show_all`)}
  </label>
{/if}
