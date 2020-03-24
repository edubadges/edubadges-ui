<script>
  import I18n from "i18n-js";
  import eduIdLogo from "../img/logo_eduid.svg";
  import {
    arrowRight,
    stepChecked,
    step1,
    step2,
    step3,
    icon2,
    icon3
  } from "../icons";

  export let activeStep = 1;

  let steps = [
    { iconNumber: step1, iconStep: eduIdLogo },
    { iconNumber: step2, iconStep: icon2 },
    { iconNumber: step3, iconStep: icon3 }
  ];

  $: steps = steps.map((step, i) => ({
    ...step,
    current: activeStep === i + 1,
    completed: activeStep > i + 1
  }));
</script>

<style>
  .account-creation-steps {
    display: flex;
    background-color: var(--color-background-grey-medium);
    padding: 20px;
    border-radius: var(--card-border-radius);
  }

  .step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .step > *:not(:last-child) {
    margin-bottom: 8px;
  }

  .icon-number.active :global(.filler) {
    fill: var(--color-background-blue);
    stroke: var(--color-background-blue);
  }

  .icon-number:not(.active) :global(.filler) {
    fill: white;
    stroke: var(--color-text-light-grey);
  }

  .icon-number.active :global(text) {
    fill: white;
  }

  .icon-number:not(.active) :global(text) {
    fill: var(--color-text-light-grey);
  }

  .icon-number {
    width: 40px;
  }

  .icon-step.active,
  .icon-arrow.active {
    fill: var(--color-background-blue);
  }

  .icon-step:not(.active),
  .icon-arrow:not(.active) {
    fill: var(--color-text-light-grey);
  }

  .icon-step :global(svg) {
    max-width: 90px;
    height: 45px;
  }

  .icon-arrow {
    margin: auto 4px;
    width: 20px;
  }
</style>

<div class="account-creation-steps">
  {#each steps as step, i}
    <div class="step">
      <div class="icon-number" class:active={step.current}>
        {@html step.completed ? stepChecked : step.iconNumber}
      </div>

      <div class="icon-step" class:active={step.current || step.completed}>
        {@html step.iconStep}
      </div>

      <div class:bold={step.current}>
        {I18n.t(`login.createEduId.steps.step${i + 1}`)}
      </div>
    </div>

    {#if i < steps.length - 1}
      <div class="icon-arrow" class:active={step.completed}>
        {@html arrowRight}
      </div>
    {/if}
  {/each}
</div>
