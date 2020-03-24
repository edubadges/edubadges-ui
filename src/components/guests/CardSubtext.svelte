<script>
  export let styleAsLink;
  export let handleClick;
  export let hidden;
  export let lineOne;
  export let lineTwo;
</script>

<style>
  div {
    width: 80%;
    margin: 20px auto 0;
  }

  p {
    font-size: 20px;
    margin-top: 12px;
  }

  p.styleAsLink {
    color: blue;
    cursor: pointer;
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
