<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { Table } from "../teachers";

  export let badgeclasses = [];

  $: table = {
    title: `${I18n.t("teacher.badgeclasses.title")} (${badgeclasses.length})`,
    tableHeaders: ["Name"]
  };
</script>

<Table {...table}>
  {#each badgeclasses as badgeclass (badgeclass.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/badgeclass/${badgeclass.entityId}`)}>
      <td>{badgeclass.name}</td>
    </tr>
  {/each}
</Table>
