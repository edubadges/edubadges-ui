<script>

  export let value;
  export let values;
  export let label;
  export let readOnly = false;
  export let onChange = null;

</script>

<style>
  .container {
    position: relative;
    padding: 3px 35px 0 35px;
    cursor: pointer;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: white;
    border-radius: 50%;
    border: 1px solid purple;
  }

  .container:hover input ~ .checkmark {
    background-color: rgba(248, 247, 247, 0.5);
  }

  /* When the radio button is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: white;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  .container .checkmark:after {
    top: 6px;
    left: 6px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: purple;
  }

  span.label {
    word-break: normal;
  }

  /* ReadOnly */
  label[readOnly="true"] {
     cursor: not-allowed !important;
  }
  label[readOnly="true"] .checkmark {
      border: 1px solid var(--grey-7);
  }
  label[readOnly="true"] .checkmark:after {
      background: var(--grey-7)
  }

</style>

<label class="container" {readOnly}>
  <input type="radio" bind:group={values} value={value} disabled={readOnly} on:change={onChange && onChange()}/>
  <span class="checkmark"></span>
  <span class="label">{label}</span>
</label>
