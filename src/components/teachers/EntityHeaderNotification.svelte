<script>
    import warning from "../../icons/warning.svg";

    export let msg;

</script>
<style lang="scss">
  div.info {
    display: flex;
    align-items: center;
    max-width: 180px;

    span {
      line-height: 20px;

      &:first-child {
        margin-right: 15px;
        max-width: 100%;
      }
    }

    :global(span.warning svg) {
      width: 28px;
      height: auto;
      fill: var(--red-dark);
    }
  }

</style>

<div class="info">
  <span class="warning">{@html warning}</span>
  <span>{msg}</span>
</div>