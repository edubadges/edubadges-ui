<script>
  export let value;
  export let onChange;
</script>

<input
  type="checkbox"
  bind:checked={value}
  on:change={e => onChange(e.target.checked)} />
