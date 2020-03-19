<script>
  import I18n from "i18n-js";
  import eduIdLogo from "../img/logo_eduid.svg";
  import arrowRightActive from "../icons/arrow-right-active.svg";
  import arrowRightInactive from "../icons/arrow-right-inactive.svg";
  import stepChecked from "../icons/step-checked.svg";
  import stepInactive2 from "../icons/step-inactive-2.svg";
  import stepInactive3 from "../icons/step-inactive-3.svg";
  import stepActive1 from "../icons/step-active-1.svg";
  import stepActive2 from "../icons/step-active-2.svg";
  import stepActive3 from "../icons/step-active-3.svg";
  import badge from "../icons/badge.svg";
  import stepIcon2Active from "../icons/step-icon-building-active.svg";
  import stepIcon2Inactive from "../icons/step-icon-building-inactive.svg";

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
</style>

<div class="account-creation-steps">
  <div class="step">
    <div class="stepNumber">{@html activeStep === 1 ? stepActive1 : stepChecked}</div>
    <div class="icon-holder">
      <div class="eduicon">{@html eduIdLogo}</div>
    </div>
    <div class="stepText {textStyle(1, activeStep)}">{I18n.t('login.student.accountCreation.steps.step1')}</div>
  </div>
  <div class="arrow">{@html activeStep < 2 ? arrowRightInactive : arrowRightActive}</div>
  <div class="step">
    <div class="stepNumber">{@html activeStep < 2 ? stepInactive2 : activeStep === 2 ? stepActive2 : stepChecked}</div>
    <div class="icon-holder">
      <div class="icon">{@html activeStep >= 2 ? stepIcon2Active : stepIcon2Inactive}</div>
    </div>
    <div class="stepText {textStyle(2, activeStep)}">{I18n.t('login.student.accountCreation.steps.step2')}</div>
  </div>
  <div class="arrow">{@html activeStep < 3 ? arrowRightInactive : arrowRightActive}</div>
  <div class="step">
    <div class="stepNumber">{@html activeStep < 3 ? stepInactive3 : activeStep === 3 ? stepActive3 : stepChecked}</div>
    <div class="icon-holder">
      <div class="icon">{@html badge}</div>
    </div>
    <div class="stepText {textStyle(3, activeStep)}">{I18n.t('login.student.accountCreation.steps.step3')}</div>
  </div>
</div>
