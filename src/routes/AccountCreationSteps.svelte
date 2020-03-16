<script>
  import I18n from "i18n-js";
  import eduIdLogo from "../img/logo_eduid.svg";

  const stepNumberStyle = (thisStep, activeStep) => {
    return thisStep > activeStep ? 'grey' : thisStep === activeStep ? 'blue' : 'green';
  };

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

  .step-number {
    font-size: 20px;
  }

  .green {
    color: green;
  }

  .blue {
    color: blue;
  }

  .grey {
    color: gray;
  }

  .bold {
    font-weight: 900;
  }

  .hidden {
    visibility: hidden;
  }

</style>

<div class="account-creation-steps" on:click={() => activeStep = (activeStep % 3 + 1)}>  <!-- TODO: remove on click -->
  <div>
    <div class="step-number {stepNumberStyle(1, activeStep)}">1</div>
    <div>{@html eduIdLogo}</div>
    <div class="{textStyle(1, activeStep)}">{I18n.t('login.studentCreatesAccountSteps.step1')}</div>
  </div>
  <div>--></div>
  <div>
    <div class="step-number {stepNumberStyle(2, activeStep)}">2</div>
    <div>icon2</div>
    <div class="{textStyle(2, activeStep)}">{I18n.t('login.studentCreatesAccountSteps.step2')}</div>
  </div>
  <div>--></div>
  <div>
    <div class="step-number {stepNumberStyle(3, activeStep)}">3</div>
    <div>icon3</div>
    <div class="{textStyle(3, activeStep)}">{I18n.t('login.studentCreatesAccountSteps.step3')}</div>
  </div>
</div>