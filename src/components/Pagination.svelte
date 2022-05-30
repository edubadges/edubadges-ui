<script>
    import chevronLeft from "../icons/chevron-left.svg";
    import chevronRight from "../icons/chevron-right.svg";
    import {pagination} from "../util/pagination";

    export let currentPage;
    export let onChange;
    export let total;
    export let pageCount;

    let nbrPages;
    let rangeWithDots;

    $: nbrPages = Math.ceil(total / pageCount)
    $: rangeWithDots = pagination(currentPage, nbrPages)

</script>
<style lang="scss">

  section.pagination {
    display: flex;
    font-weight: bolder;

    section.pagination-container {
      margin: 40px 40px 20px auto;
      display: flex;
      font-size: 20px;
      align-content: center;
      align-items: center;
    }

    span.link {
      color: var(--grey-8);
      background: none;
      border: 1px solid var(--grey-8);
      border-radius: 8px;
      padding: 10px 14px;
      display: inline-block;
      margin: 0 10px;
      cursor: pointer;

      &:hover {
        background-color: var(--purple-hover);
      }

      &.chevron {
        padding: 5px 6px;
      }

      &.current {
        color: var(--purple-6);
        cursor: default;
        border: 1px solid var(--purple-6);
        background-color: var(--purple-1);

        &:hover {
          background-color: var(--purple-1);
        }
      }

      &.dots {
        cursor: default;
        border: none;
      }
    }

    :global(span svg) {
      width: 24px;
      height: auto;
      fill: var(--grey-8);
    }

  }

</style>

{#if total > pageCount}
    <section class="pagination">
        <section class="pagination-container">
            {#if nbrPages > 1 && currentPage !== 1}
                <span class="link chevron" on:click={() => onChange(currentPage - 1)} title="Previous page"
                      aria-label="Previous page">
                    {@html chevronLeft}
                </span>
            {/if}
            {#each rangeWithDots as nbr}
                {#if typeof nbr === 'string' || nbr instanceof String}
                    <span class="link dots">{nbr}</span>
                {:else if nbr === currentPage}
                    <span class="link current">{nbr}</span>
                {:else}
                    <span class="link" on:click={() => onChange(nbr)}>{nbr}</span>
                {/if}
            {/each}
            {#if nbrPages > 1 && currentPage !== nbrPages}
                <span class="link chevron" on:click={() => onChange(currentPage + 1)} title="Next page"
                      aria-label="Next page">
                    {@html chevronRight}
                </span>
            {/if}
        </section>
    </section>

{/if}

