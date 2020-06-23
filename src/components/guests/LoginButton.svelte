<script>
  export let label;
  export let sub = "";
  export let onClick;
</script>

<style lang="scss">
  a {
    text-decoration: none;

    width: 100%;
    max-width: 300px;
    height: 70px;
    margin-top: 20px;

    background-color: var(--purple);
    color: white;
    border-radius: 5px;
    font-size: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
      color: darken(white, 10%);
    }
  }
</style>

<a
  class="button"
  href="/login"
  on:click|preventDefault|stopPropagation={onClick}>
  {label}
  <span class="sub-text">{sub}</span>
</a>
