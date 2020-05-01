<script>
  import {flash, msgLevel} from "../../stores/flash";
  import closeIcon from "../../icons/close_smll.svg";

</script>

<style>
  .flash {
    color: white;
    position: absolute;
    width: 100%;
    height: 46px;
    z-index: 6;
    left: 0;
    background-color: var(--green-dark);
    transition: height 750ms ease-in-out;
  }

  .flash.hide {
    transition: height 750ms ease-in-out;
    height: 0;
  }

  .flash.error {
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


  :global(span.close svg) {
    fill: white;
    width: 20px;
  }

</style>

<div class="flash" class:hide={!$flash.val} class:error={$flash.level == msgLevel.ERROR}>
  <div class="message-container">
    <p>{$flash.val}</p>
  </div>
</div>