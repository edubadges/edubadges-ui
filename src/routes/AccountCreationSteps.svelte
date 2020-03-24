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

  const textStyle = (thisStep, activeStep) => {
    return thisStep > activeStep
      ? ""
      : thisStep === activeStep
      ? "bold"
      : "hidden";
  };

  export let activeStep;

  const steps = [
    {
      stepCountIcon: step1,
      icon: eduIdLogo
    },
    {
      stepCountIcon: step2,
      icon: icon2
    },
    {
      stepCountIcon: step3,
      icon: icon3
    }
  ];
</script>

<style>
  .account-creation-steps {
    display: flex;
    text-align: center;
    align-items: center;
    background-color: var(--color-background-grey-medium);
    padding: 20px;
    border-radius: 5px;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
  }

  .stepNumber {
    height: 40px;
    width: 40px;
  }

  .icon-holder {
    width: 90px;
    height: 45px;
    margin-top: 8px;
    margin-bottom: 4px;
  }

  .icon {
    width: 45px;
    height: 45px;
  }

  .stepText {
    display: flex;
    align-items: center;
    height: 55px;
  }

  .arrow {
    margin-left: 4px;
    margin-right: 4px;
    height: 20px;
    width: 20px;
  }

  .bold {
    font-weight: 900;
  }

  .hidden {
    visibility: hidden;
  }

  .inactive {
    fill: var(--color-text-light-grey);
  }

  .active {
    fill: var(--color-background-blue);
  }

  .step-active :global(.filler) {
    fill: var(--color-background-blue);
    stroke: var(--color-background-blue);
  }

  .step-inactive :global(.filler) {
    fill: white;
    stroke: var(--color-text-light-grey);
  }

  .step-active :global(text) {
    fill: white;
  }

  .step-inactive :global(text) {
    fill: var(--color-text-light-grey);
  }
</style>

<div class="account-creation-steps">
  {#each steps as step, i}
    <div class="step">
      <div
        class="stepNumber {activeStep < i + 1 ? 'step-inactive' : 'step-active'}">
        {@html activeStep <= i + 1 ? step.stepCountIcon : stepChecked}
      </div>

      <div class="icon-holder {activeStep < i + 1 ? 'inactive' : 'active'}">
        {@html step.icon}
      </div>

      <div class="stepText {textStyle(i + 1, activeStep)}">
        {I18n.t(`login.createEduId.steps.step${i + 1}`)}
      </div>
    </div>

    {#if i + 1 < steps.length}
      <div class="arrow {activeStep < i + 1 ? 'inactive' : 'active'}">
        {@html arrowRight}
      </div>
    {/if}
  {/each}
</div>
