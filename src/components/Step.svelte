<script>
  export let stepNumber;
  export let stepIcon;
  export let stepText;
  export let activeStep;

  const stepNumberStyle = (currentStep) => {
    if (stepNumber > currentStep) {
      return '';
    }
    if (stepNumber === currentStep) {
      return 'bold';
    }
    if (stepNumber < currentStep) {
      return 'hidden';
    }
  };

  const iconStyle = (currentStep) => {
    if (stepNumber > currentStep) {
      return '';
    }
    if (stepNumber === currentStep) {
      return 'bold';
    }
    if (stepNumber < currentStep) {
      return 'hidden';
    }
  };

  const textStyle = (currentStep) => {
    if (stepNumber > currentStep) {
      return '';
    }
    if (stepNumber === currentStep) {
      return 'bold';
    }
    if (stepNumber < currentStep) {
      return 'hidden';
    }
  };

</script>

<style>
  .bold {
    font-weight: 900;
  }

  .hidden {
    visibility: hidden;
  }
</style>

<div>
  <div>{stepNumber}</div>
  <div>{@html stepIcon}</div>
  <p class={textStyle(activeStep)}>{stepText}</p>
</div>
