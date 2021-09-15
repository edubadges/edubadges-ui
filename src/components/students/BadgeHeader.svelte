<script>
    export let title;
</script>
<style lang="scss">
  div.badge-header {
    background-color: var(--purple-2);
    color: var(--purple);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    margin-bottom: 25px;

    h1 {
      font-size: 28px;
    }
  }

</style>
<div class="badge-header">
  <h1>{title}</h1>
</div>
