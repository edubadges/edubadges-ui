<script>
  import AccountCreationSteps from "../routes/AccountCreationSteps.svelte";

  let expanded = true;
</script>

<style>
  .widget {
    margin-top: 10px;
    width: 100%;
    background-color: cadetblue;
  }

  .hidden {
    display: none;
  }
</style>

<div class="widget">
  <div on:click={() => expanded = !expanded}>
    <p>Don't have a Backpack yet?</p>
  </div>
  <div class={expanded ? '' : 'hidden'}>
    <div>You will need</div>
    <AccountCreationSteps />
    <div>button create</div>
  </div>
</div>
