<script>
  import Step from "../components/Step.svelte";
  import I18n from "i18n-js";

  const stepData = [
    {stepText: I18n.t('login.student.accountCreation.step1'), stepIcon: "icon-active"},
    {stepText: I18n.t('login.student.accountCreation.step2'), stepIcon: "icon-active"},
    {stepText: I18n.t('login.student.accountCreation.step3'), stepIcon: "icon-active"}
  ];

  let activeStep = 1;
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
      <Step stepText={step['stepText']} stepIcon={step['stepIcon']} stepNumber={i + 1} active={activeStep === i + 1} />
    </div>

    {#if i !== stepData.length - 1}
      <div>
        -->  <!-- TODO: icon -->
      </div>
    {/if}
  {/each}
</div>