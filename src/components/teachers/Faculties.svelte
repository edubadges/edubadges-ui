<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { Table } from "../teachers";

  export let faculties = [];

  $: table = {
    title: `${I18n.t("teacher.faculties.title")} (${faculties.length})`,
    tableHeaders: ["Name", `#${I18n.t("teacher.issuers.title").toLowerCase()}`]
  };
</script>

<style>
  tr {
    cursor: pointer;
  }
</style>

<Table {...table}>
  {#each faculties as faculty (faculty.entityId)}
    <tr on:click={() => navigate(`/manage/faculty/${faculty.entityId}`)}>
      <td>{faculty.name}</td>
      <td>{faculty.issuers.length}</td>
    </tr>
  {/each}
</Table>
