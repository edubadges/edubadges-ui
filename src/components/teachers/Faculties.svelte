<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { Table } from "../teachers";

  export let faculties = [];

  $: table = {
    title: `${I18n.t("teacher.faculties.title")} (${faculties.length})`,
    tableHeaders: ["Name", `#${I18n.t("teacher.issuers.title").toLowerCase()}`]
  };
</script>

<Table {...table}>
  {#each faculties as faculty}
    <tr>
      <td>{faculty.name}</td>
      <td>{faculty.issuers.length}</td>
    </tr>
  {/each}
</Table>
