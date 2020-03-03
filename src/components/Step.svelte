<script>
  export let stepNumber = '';
  export let stepIcon = 'icon-active';
  export let stepText = '';
  export let active = false;

  const icon = (active) => {
    return active ? stepIcon : 'icon-inactive'
  };
</script>

<style>
  .bold {
    font-weight: 900;
  }
</style>

<div on:click={() => active = !active}>
  <div>{stepNumber}</div>
  <div>{icon(active)}</div>
  <p class={active ? 'bold' : ''}>{stepText}</p>
</div>
