<script>
  export let none;
  export let outOfFocus;
</script>

<style>
  div {
    flex: 1;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 20px;
    padding: 20px;

    border: var(--card-border);
    border-radius: var(--card-border-radius);
    box-shadow: var(--card-shadow);

    text-align: center;
  }

  .out-of-focus::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: gray;
    opacity: 0.5;
  }

  @media only screen and (max-width: 819px) {
    .out-of-focus {
      display: none;
    }
  }

  .none {
    display: none;
  }
</style>

<div class:none class:out-of-focus={outOfFocus}>
  <slot />
</div>
