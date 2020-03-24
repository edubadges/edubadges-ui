<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { Table } from "../teachers";
  import { queryData } from "../../api/graphql";

  let issuers = [];

  const query = `{
      issuers {
        name,
        faculty {
          name
        },
        badgeclasses {
          entityId
        }
      }
    }`;

  onMount(() => {
    queryData(query).then(res => {
      issuers = res.issuers;
    });
  });

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
        <span class="sub-text">({issuer.faculty.name})</span>
      </td>
      <td>{issuer.badgeclasses.length}</td>
    </tr>
  {/each}
</Table>
