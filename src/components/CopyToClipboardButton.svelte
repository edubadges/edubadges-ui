<script>
  import Button from "./Button.svelte";
  import I18n from "i18n-js";
  import copy from 'copy-to-clipboard';


  export let text;
  export let secondary;
  export let disabled = false;
  export let small;
  export let toCopy;
  export let copied = false;

  const copyToClipboard = toCopy => {
    copy(toCopy);
    copied = true;
    setTimeout(() => copied = false, 1800);
  }

</script>

<style lang="scss">
  div.copy-to-clipboard-container {
    display: flex;
    position: relative;
  }

  div.copy-to-clipboard {
    display: flex;

    &.copied {
      animation: pulse 1.8s;
      animation-iteration-count: 1;
      position: relative;
      border-radius: 5px;

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 white;
        }
        55% {
          box-shadow: 0 0 4px 4px var(--purple-4);
        }
        100% {
          box-shadow: 0 0 0 0 white;
        }
      }

    }
  }

</style>
<div class="copy-to-clipboard-container">
  <div class="copy-to-clipboard" class:copied>
    <Button {secondary} {text} {disabled} {small} action={() => copyToClipboard(toCopy)}/>
  </div>
</div>


