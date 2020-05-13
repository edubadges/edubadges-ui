<script>
  import {flash, msgLevel} from "../../stores/flash";
  import closeIcon from "../../icons/close_smll.svg";

</script>

<style lang="scss">
  .flash {
    color: white;
    position: absolute;
    width: 100%;
    height: 46px;
    z-index: 6;
    left: 0;
    background-color: var(--green-dark);
    transition: height 750ms ease-in-out;

    &.hide {
      transition: height 750ms ease-in-out;
      height: 0;
    }

    &.error {
      background-color: var(--red-dark);
    }

    .message-container p {
      padding: 10px 25px 0 20px;
      font-size: 16px;
    }

    @media (max-width: 820px) {
      .message-container p {
        padding: 3px 25px 0 60px;
      }
    }

    span.hide {
      display: none;
    }

    :global(span.close svg) {
      fill: white;
      width: 32px;
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
    }

  }


</style>

<div class="flash" class:hide={!$flash.val} class:error={$flash.level == msgLevel.ERROR}>
  <span class="close" class:hide={!$flash.val} on:click={() => flash.setValue("")}>{@html closeIcon}</span>
  <div class="message-container">
    <p>{$flash.val}</p>
  </div>
</div>