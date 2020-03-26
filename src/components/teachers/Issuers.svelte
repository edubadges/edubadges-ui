<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { Table } from "../teachers";

  export let issuers = [];
  export let facultyName = "";

  $: table = {
    title: `${I18n.t("teacher.issuers.title")} (${issuers.length})`,
    tableHeaders: [
      "Name",
      `#${I18n.t("teacher.badgeclasses.title").toLowerCase()}`
    ]
  };
</script>

<Table {...table}>
  {#each issuers as issuer}
    <tr>
      <td>
        {issuer.name}
        <br />
        <span class="sub-text">({facultyName || issuer.faculty.name})</span>
      </td>
      <td>{issuer.badgeclasses.length}</td>
    </tr>
  {/each}
</Table>
