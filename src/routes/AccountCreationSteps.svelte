<script>
  import Step from "../components/Step.svelte";

  const stepData = [
    {stepText: "asdf 1 ", stepIcon: "qwer 1"},
    {stepText: "asdf 2 ", stepIcon: "qwer 2"},
    {stepText: "asdf 3 ", stepIcon: "qwer 3"}
  ]
</script>

<style>
  .account-creation-steps {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .account-creation-step {
    width: 20%;
  }
</style>

<div class="account-creation-steps">
  {#each stepData as step, i}
    <div class="account-creation-step">
      <Step stepText={step['stepText']} stepIcon={step['stepIcon']} stepNumber={i + 1} />
    </div>

    {#if i !== stepData.length - 1}
      <div>
        -->
      </div>
    {/if}
  {/each}
</div>