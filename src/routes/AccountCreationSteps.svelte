<script>
  import I18n from "i18n-js";
  import eduIdLogo from "../img/logo_eduid.svg";

  const stepNumberStyle = (thisStep, activeStep) => {
    if (thisStep > activeStep) {
      return 'grey';
    }
    if (thisStep === activeStep) {
      return 'blue';
    }
    if (thisStep < activeStep) {
      return 'green';
    }
  };

  const textStyle = (thisStep, activeStep) => {
    if (thisStep > activeStep) {
      return '';
    }
    if (thisStep === activeStep) {
      return 'bold';
    }
    if (thisStep < activeStep) {
      return 'hidden';
    }
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
    grid-row-start: 1;
    grid-row-end: 2;
    font-size: 20px;
  }

  .step-icon {
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .step-text {
    grid-row-start: 3;
    grid-row-end: 4;
  }

  .step-one {
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .step-two {
    grid-column-start: 3;
    grid-column-end: 4;
  }

  .step-three {
    grid-column-start: 5;
    grid-column-end: 6;
  }

  .step-arrow {
    grid-row-start: 2;
    grid-row-end: 3
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
    <div class="step-number step-one {stepNumberStyle(1, activeStep)}">1</div>
    <div class="step-icon step-one">{@html eduIdLogo}</div>
    <div class="step-text step-one {textStyle(1, activeStep)}">{I18n.t('login.student.accountCreation.step1')}</div>
  </div>
  <div class="step-arrow">--></div>
  <div>
    <div class="step-number step-two {stepNumberStyle(2, activeStep)}">2</div>
    <div class="step-icon step-two">icon2</div>
    <div class="step-text step-two {textStyle(2, activeStep)}">{I18n.t('login.student.accountCreation.step2')}</div>
  </div>
  <div class="step-arrow">--></div>
  <div>
    <div class="step-number step-three {stepNumberStyle(3, activeStep)}">3</div>
    <div class="step-icon step-three">icon3</div>
    <div class="step-text step-three {textStyle(3, activeStep)}">{I18n.t('login.student.accountCreation.step3')}</div>
  </div>
</div>