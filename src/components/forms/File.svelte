<script>
  import {Button} from "../forms";
 import I18n from "i18n-js";

  export let value;
  export let error;
  export let disabled;
  export let removeAllowed = false;

  let input;
  let src = "";

  $: if (value) src = value;

  const reader = new FileReader();
  reader.onload = ({target: {result}}) => {
    value = result;
    src = result;
  };

  const setFile = file => {
    if (file) {
      reader.readAsDataURL(file);
    } else {
      value = "";
      src = "";
      input.value = "";
    }
  };
</script>

<style>
  div.container {
    max-width: var(--field-max-width);
    display: flex;
  }

  div.image-container {
    flex: 0 0 auto;
    height: 120px;
    width: 120px;
    margin-right: var(--hor-padding-m);
    border: var(--field-border);
    border-radius: var(--field-border-radius);
  }

  div.image-container p {
    color: var(--color-text-light-grey);
    text-align: center;
    padding: 6px;
  }

  div.buttons-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  div.buttons-container > :global(.btn) {
    margin-bottom: 5px;
    max-width: 180px;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
  }

  input:focus + label {
    outline: var(--outline-fallback);
    outline: var(--outline);
  }

  /* Invalid */
  div[error] .image-container {
    border: var(--field-border-error);
    background: var(--field-background-error);
  }

  /* Disabled */
  div[disabled] .image-container {
    border: var(--field-border-disabled);
  }

  div[disabled] .buttons-container > :global(.btn) {
    color: white;
    background: var(--button-background-disabled);
    border-color: var(--button-background-disabled);
    cursor: var(--field-cursor-disabled);
  }

  div[disabled] .buttons-container > :global(.btn.ghost) {
    color: var(--button-background-disabled);
    background: white;
    border-color: var(--button-background-disabled);
  }

  div[disabled] .buttons-container > :global(.btn.ghost.no-border) {
    border-color: white;
  }
</style>

<div class="container" {error} {disabled}>
  <div class="image-container">
    {#if src}
      <img alt="preview" {src}/>
    {:else}
      <p>{I18n.t("file.noFileSelected")}</p>
    {/if}
  </div>

  <div class="buttons-container">
    <input
      id="file"
      type="file"
      accept="image/*"
      on:change={({ target }) => setFile(target.files[0])}
      bind:this={input}
      {disabled} />

    <label class="btn" for="file">{I18n.t("file.upload")}</label>
    {#if removeAllowed}
      <button class="btn ghost no-border" on:click={_ => setFile()} {disabled}>
        {I18n.t("file.remove")}
      </button>
    {/if}
    <span class="disclaimer">{I18n.t("file.disclaimer")}</span>
  </div>

</div>
