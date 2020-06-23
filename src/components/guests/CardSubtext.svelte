<script>
  export let hidden;
  export let small = false;
  export let lineOne;
  export let lineTwo;
</script>

<style lang="scss">
  div {
    text-align: left;
    width: 100%;
    margin: 35px auto 0;
    padding-top: 30px;
    max-width: 300px;
    border-top: 1px solid var(--grey-5);
  }

  p {
    margin-top: 2px;

    &.small {
      font-size: 16px;
      line-height: 18px;
    }
  }

  @media only screen and (max-width: 819px) {
    div {
      margin: 10px auto 20px;
    }

    .hidden {
      display: none;
    }
  }

  .hidden {
    visibility: hidden;
  }
</style>

<div class="no-account" class:hidden>
  <p class:small>
    {@html lineOne}
  </p>
  {#if lineTwo}
    <p class:small>{lineTwo}</p>
  {/if}
</div>
