<script>
  export let styleAsLink;
  export let handleClick;
  export let hidden;
  export let lineOne;
  export let lineTwo;
</script>

<style>
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
  }

  p.styleAsLink {
    color: var(--green-dark);
    cursor: pointer;
    text-decoration: underline;
    margin-top: 2px;
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
  <p>
    {@html lineOne}
  </p>
  <p class:styleAsLink on:click={handleClick}>{lineTwo}</p>
</div>
