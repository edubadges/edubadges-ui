<script>
  import I18n from "i18n-js";
  import { search } from "../../stores/filter";
</script>

<style>
  p {
    font-weight: bold;
  }

  input[type="text"] {
    width: 100%;
    height: 30px;
    border: var(--card-border);
  }
</style>

<p>{I18n.t('teacher.sidebar.search')}</p>
<input type="text" bind:value={$search} />
