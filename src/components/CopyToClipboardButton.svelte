<script>
  import Button from "./Button.svelte";
  import I18n from "i18n-js";
  import copy from 'copy-to-clipboard';
  import {flash} from "../stores/flash";
  import copyIcon from "../icons/copy-svgrepo-com.svg";

  export let text;
  export let secondary;
  export let disabled = false;
  export let small;
  export let full;
  export let toCopy;
  export let copied = false;
  export let actionAfterCopy;
  export let doFlash = true;
  export let displayIcon = false;

  const copyToClipboard = toCopy => {
    copy(toCopy, {format: "text/plain"});
    copied = true;
    setTimeout(() => copied = false, 850);
    if (doFlash) {
      flash.setValue(I18n.t("copyToClipboard.copied"));
    }
    actionAfterCopy && actionAfterCopy();
  }



</script>

<style lang="scss">
  div.copy-to-clipboard-container {
    display: flex;
    position: relative;

    &.full {
      width: 100%;
    }
  }

  div.copy-to-clipboard {
    display: flex;

    &.full {
      width: 100%;
    }

    &.copied {
      animation: pulse 0.8s;
      animation-iteration-count: 1;
      position: relative;
      border-radius: 5px;

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 white;
        }
        55% {
          box-shadow: 0 0 3px 3px var(--purple-4);
        }
        100% {
          box-shadow: 0 0 0 0 white;
        }
      }

    }
  }

</style>
<div class="copy-to-clipboard-container" class:full>
  <div class="copy-to-clipboard" class:copied class:full>
    <Button {secondary} {text} {disabled} {small}
            fill={full}
            icon={displayIcon ? copyIcon : null}
            action={() => copyToClipboard(toCopy)}/>
  </div>
</div>


