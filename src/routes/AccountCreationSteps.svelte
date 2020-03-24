<script>
  import I18n from "i18n-js";
  import eduIdLogo from "../img/logo_eduid.svg";
  import { arrowRight, stepChecked, step1, step2, step3, icon2, icon3 } from "../icons";

  const textStyle = (thisStep, activeStep) => {
    return thisStep > activeStep ? '' : thisStep === activeStep ? 'bold' : 'hidden';
  };

  export let activeStep;
</script>

<style>
  .account-creation-steps {
    display: flex;
    text-align: center;
    align-items: center;
    background-color: lightgrey;
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
    height: 45px;
    margin-top: 8px;
    margin-bottom: 4px;
  }

  .eduicon {
    margin-top: 5px;
    width: 90px;
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
    fill: var(--color-login-gray);
  }

  .active {
    fill: var(--color-login-blue);
  }

  .step-active :global(.filler){
    fill: var(--color-login-blue);
    stroke: var(--color-login-blue);
  }

  .step-inactive :global(.filler){
    fill: var(--color-login-white);
    stroke: var(--color-login-gray);
  }

  .step-active :global(text){
    fill: var(--color-login-white);
  }

  .step-inactive :global(text){
    fill: var(--color-login-gray);
  }
</style>

<div class="account-creation-steps">
  <div class="step">
    <div class="stepNumber step-active">
      {@html activeStep === 1 ? step1 : stepChecked}
    </div>
    <div class="icon-holder">
      <div class="eduicon">{@html eduIdLogo}</div>
    </div>
    <div class="stepText {textStyle(1, activeStep)}">{I18n.t('login.createEduId.steps.step1')}</div>
  </div>
  <div class="arrow {activeStep < 2 ? 'inactive' : 'active' }">{@html arrowRight}</div>
  <div class="step">
    <div class="stepNumber {activeStep < 2 ? 'step-inactive' : 'step-active'}">
      {@html activeStep <= 2 ? step2 : stepChecked}
    </div>
    <div class="icon-holder">
      <div class="icon {activeStep < 2 ? 'inactive' : 'active' }">{@html icon2}</div>
    </div>
    <div class="stepText {textStyle(2, activeStep)}">{I18n.t('login.createEduId.steps.step2')}</div>
  </div>
  <div class="arrow {activeStep < 3 ? 'inactive' : 'active' }">{@html arrowRight}</div>
  <div class="step">
    <div class="stepNumber {activeStep < 3 ? 'step-inactive' : 'step-active'}">
      {@html activeStep <= 3 ? step3 : stepChecked}
    </div>
    <div class="icon-holder">
      <div class="icon">{@html icon3}</div>
    </div>
    <div class="stepText {textStyle(3, activeStep)}">{I18n.t('login.createEduId.steps.step3')}</div>
  </div>
</div>
