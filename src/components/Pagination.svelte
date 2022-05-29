<script>
    import chevronLeft from "../icons/chevron-left.svg";
    import chevronRight from "../icons/chevron-right.svg";
    import pagination from "../util/pagination";

    export let page = 1;
    export let total;
    export let pageCount = 20;
    export let onChange;

    const nbrPages = Math.ceil(total / pageCount)
    const rangeWithDots = pagination(page, nbrPages)

</script>
<style lang="scss">

  section.pagination {
    display: flex;
    font-weight: bolder;

    section.pagination-container {
      margin: 40px auto 20px auto;
      display: flex;
      font-size: 20px;
      align-content: center;
      align-items: center;
    }

    button {
      color: var(--blue-link);
      background: none;
      border: 0;
      padding: 0;
      margin: 0 10px;
      cursor: pointer;
      font-weight: bolder;

    }

    :global(button svg) {
      width: 24px;
      height: auto;
      fill: var(--blue-link);
    }

    span {
      display: inline-block;
      margin: 0 10px;
      color: var(--blue-link);
      cursor: pointer;

      &.current, &.dots {
        color: var(--grey-8);
        cursor: default;

      }

    }

  }

</style>

{#if total > pageCount}
    <section class="pagination">
        <section class="pagination-container">
            {#if nbrPages > 1 && page !== 1}
                <button type="button" on:click={() => onChange(page - 1)} title="Previous page"
                        aria-label="Previous page">
                    {@html chevronLeft}
                </button>
            {/if}
            {#each rangeWithDots as nbr}
                {#if typeof nbr === 'string' || nbr instanceof String}
                    <span class="dots">{nbr}</span>
                {:else if nbr === page}
                    <span class="current">{nbr}</span>
                {:else}
                    <button type="button" on:click={() => onChange(nbr)}>{nbr}</button>
                {/if}
            {/each}
            {#if nbrPages > 1 && page !== nbrPages}
                <button type="button" on:click={() => onChange(page + 1)} title="Next page" aria-label="Next page">
                    {@html chevronRight}
                </button>
            {/if}
        </section>
    </section>

{/if}

