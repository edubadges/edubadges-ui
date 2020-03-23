<script>
  import I18n from "i18n-js";
  import eduIdLogo from "../img/logo_eduid.svg";
  import { arrowRight, stepChecked, step1Active, step2Active, step2Inactive,
      step3Active, step3Inactive, icon2Active, icon2Inactive, icon3Inactive } from "../icons";

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
    fill: grey;
  }

  .green {
    fill: #173552;
  }

  .icon-active {
    fill: #173552;
  }
</style>

<div class="account-creation-steps">
  <div class="step">
    <div class="stepNumber">{@html activeStep === 1 ? step1Active : stepChecked}</div>
    <div class="icon-holder">
      <div class="eduicon">{@html eduIdLogo}</div>
    </div>
    <div class="stepText {textStyle(1, activeStep)}">{I18n.t('login.createEduId.steps.step1')}</div>
  </div>
  <div class="arrow {activeStep < 2 ? 'inactive' : 'green' }">{@html arrowRight}</div>
  <div class="step">
    <div class="stepNumber">{@html activeStep < 2 ? step2Inactive : activeStep === 2 ? step2Active : stepChecked}</div>
    <div class="icon-holder">
      <div class="icon">{@html activeStep >= 2 ? icon2Active : icon2Inactive}</div>
    </div>
    <div class="stepText {textStyle(2, activeStep)}">{I18n.t('login.createEduId.steps.step2')}</div>
  </div>
  <div class="arrow {activeStep < 3 ? 'inactive' : 'green' }">{@html arrowRight}</div>
  <div class="step">
    <div class="stepNumber">{@html activeStep < 3 ? step3Inactive : activeStep === 3 ? step3Active : stepChecked}</div>
    <div class="icon-holder">
      <div class="icon">{@html icon3Inactive}</div>
    </div>
    <div class="stepText {textStyle(3, activeStep)}">{I18n.t('login.createEduId.steps.step3')}</div>
  </div>
</div>
