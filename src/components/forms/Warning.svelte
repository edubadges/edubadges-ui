<script>
  import alert from "../../icons/alert-circle.svg";

  export let msg;
</script>
<style lang="scss">
  div.warning {
    display: flex;
    align-items: center;
    max-width: 50%;
    padding: 14px;
    background-color: var(--orange-warning);
    border-radius: 4px;

    span {
      line-height: 20px;
    }

    :global(span.warning svg) {
      width: 28px;
      height: auto;
      margin-right: 15px;
    }
  }

</style>
<div class="warning">
  <span class="warning">{@html alert}</span>
  <span>{msg}
    <slot/>
  </span>

</div>