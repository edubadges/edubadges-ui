<script>
  import { Button } from "../../components";

  export let value;
  export let error;
  export let disabled;

  let input;
  let src = "";

  $: if (value) src = value;

  const reader = new FileReader();
  reader.onload = ({ target: { result } }) => {
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

<style lang="scss">
  div.container {
    display: flex;
  }

  div.image-container {
    flex: 0 0 auto;
    height: 120px;
    width: 120px;
    margin-right: var(--hor-padding-m);

    p {
      text-align: center;
      padding: 6px;
    }
  }

  div.buttons-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    > :global(*) {
      margin-bottom: 5px;
    }
  }
</style>

<div class="container file-container">
  <div class="image-container input-field" class:error class:disabled>
    {#if src}
      <img alt="preview" {src} />
    {:else}
      <p>No file selected</p>
    {/if}
  </div>

  <div class="buttons-container" {disabled}>
    <input
      class="input-hidden"
      id="file"
      type="file"
      accept="image/*"
      on:change={({ target }) => setFile(target.files[0])}
      bind:this={input}
      {disabled} />

    <Button {disabled} label="file" text="Upload image" />
    <Button {disabled} secondary action={_ => setFile()} text="Remove image" />
  </div>
</div>
