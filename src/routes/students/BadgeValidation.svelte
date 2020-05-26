<script>
  import DotSpinner from "../../components/DotSpinner.svelte";
  import validIcon from "../../icons/check-green.svg";
  import invalidIcon from "../../icons/close_smll.svg";
  import I18n from "i18n-js";

  export let fetchingValidation;
  export let validation;
</script>
<style lang="scss">
  div.validation {

    padding: 20px;
    margin-bottom: 20px;
    background-color: var(--grey-2);
    border-radius: 8px;

    &.valid {
      background-color: var(--green-dark);
    }

    &.invalid {
      background-color: var(--red-light);
    }

    div.fetching-validation {
      position: relative;
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--purple);

      .loader-container {
        margin-top: 8px;
      }
    }

    div.validation-report {
      display: flex;
      flex-direction: column;

      div.summary {
        display: flex;
        align-items: center;
      }

      :global(svg) {
        width: 30px;
      }

      :global(svg.close) {
        fill: var(--red-dark);
      }

      span {
        color: var(--red-dark);

        &.valid {
          color: white;
        }
      }
      .messages {
        margin-top: 15px;
        display: flex;
        flex-direction: column;

        span.validation-error {
          display: inline-block;
          margin-bottom: 10px;
        }
      }
    }

  }

</style>
<div class={`validation ${fetchingValidation ? 'fetching' : validation.valid ? 'valid' : 'invalid' }`}>
  {#if fetchingValidation}
    <div class="fetching-validation">
      <span>{I18n.t("student.validation.loading")}</span>
      <div class="loader-container">
        <DotSpinner/>
      </div>
    </div>
  {:else}
    <div class="validation-report" class:valid={validation.valid}>
      <div class="summary">
        {@html validation.valid ? validIcon : invalidIcon }
        <span class:valid={validation.valid}>
          {validation.valid ? I18n.t("student.validation.valid") : I18n.t("student.validation.invalid")}
        </span>
      </div>
      {#if !validation.valid}
        <div class="messages">
          {#each validation.messages as msg}
            <span class="validation-error">{`${msg.name} - ${msg.result}`}</span>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>