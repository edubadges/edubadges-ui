<script>
  export let label;
  export let sub = "";
  export let onClick;
</script>

<style>
  a {
    text-decoration: none;
    cursor: pointer;

    width: 100%;
    max-width: 300px;
    height: 70px;

    background-color: #d8d8d8;
    color: black;
    border-radius: 5px;
    border: 1px solid #979797;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  span {
    font-size: x-small;
  }
</style>

<a href="/login" on:click|preventDefault|stopPropagation={onClick}>
  {label}
  <span>{sub}</span>
</a>
