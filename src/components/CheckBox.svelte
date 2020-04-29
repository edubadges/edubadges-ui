<script>
  export let value;
  export let onChange;
  export let disabled = false;
</script>

<input
  type="checkbox"
  disabled={disabled}
  bind:checked={value}
  on:change={e => onChange(e.target.checked)}/>
