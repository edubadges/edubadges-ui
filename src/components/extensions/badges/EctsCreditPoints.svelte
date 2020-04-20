<script>
  import I18n from "i18n-js";

  export let ectsValue;

  const decrement = () => {
    ectsValue = Math.max(ectsValue - 0.5, 0.5);
  }

  const increment = () => {
    ectsValue = Math.min(ectsValue + 0.5, 10);
  }

</script>

<style>

  .ects-points {
    display: flex;
    width: 100%;
    align-content: space-between;
  }

  input, span {
    height: 42px;
    width: 48px;
    border-radius: 8px;
    border: solid 1px var(--color-text-grey);
    font-size: 18px;
    text-align: center;
    display: block;
    margin-right: 20px;
  }

  span.control {
    color: var(--color-primary-purple);
    cursor: pointer;
    line-height: 40px;
  }

  input.value {
    width: 52px;
  }

  p.info {
    font-size: 14px;
  }

</style>

<div class="ects-points">
  <span class="control" on:click={decrement}>-</span>
  <input class="value" bind:value={ectsValue}/>
  <span class="control" on:click={increment}>+</span>
  <p class="info">{@html I18n.t("models.badgeclass.info.ects")}</p>

</div>