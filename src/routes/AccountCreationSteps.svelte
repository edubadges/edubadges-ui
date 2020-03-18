<script>
  import I18n from "i18n-js";
  import eduIdLogo from "../img/logo_eduid.svg";
  import arrowRight from "../icons/arrow-right.svg";
  import stepChecked from "../icons/step-checked.svg";
  import stepInactive2 from "../icons/step-inactive-2.svg";
  import stepInactive3 from "../icons/step-inactive-3.svg";
  import stepActive1 from "../icons/step-active-1.svg";
  import stepActive2 from "../icons/step-active-2.svg";
  import stepActive3 from "../icons/step-active-3.svg";
  import badge from "../icons/badge.svg";
  import officialBuilding from "../icons/step-icon-building-active.svg";

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
  }

  .icon-margin {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .eduicon {
    width: 70px;
  }

  .stepNumber {
    height: 40px;
    width: 40px;
  }

  .icon {
    width: 40px;
    height: 30px;
  }

  .arrow {
    height: 20px;
    width: 20px;
  }

  .bold {
    font-weight: 900;
  }

  .hidden {
    visibility: hidden;
  }
</style>

<div class="account-creation-steps" on:click={() => activeStep = (activeStep % 4 + 1)}>  <!-- TODO: remove on click -->
  <div class="step">
    <div class="stepNumber">{@html activeStep === 1 ? stepActive1 : stepChecked}</div>
    <div class="eduicon icon-margin">{@html eduIdLogo}</div>
    <div class="{textStyle(1, activeStep)}">{I18n.t('login.studentCreatesAccountSteps.step1')}</div>
  </div>
  <div class="arrow">{@html arrowRight}</div>
  <div class="step">
    <div class="stepNumber">{@html activeStep < 2 ? stepInactive2 : activeStep === 2 ? stepActive2 : stepChecked}</div>
    <div class="icon icon-margin">{@html officialBuilding}</div>
    <div class="{textStyle(2, activeStep)}">{I18n.t('login.studentCreatesAccountSteps.step2')}</div>
  </div>
  <div class="arrow">{@html arrowRight}</div>
  <div class="step">
    <div class="stepNumber">{@html activeStep < 3 ? stepInactive3 : activeStep === 3 ? stepActive3 : stepChecked}</div>
    <div class="icon icon-margin">{@html badge}</div>
    <div class="{textStyle(3, activeStep)}">{I18n.t('login.studentCreatesAccountSteps.step3')}</div>
  </div>
</div>