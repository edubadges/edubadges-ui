<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import moment from "moment";
  import { Table } from "../../teachers";
  import { sort, sortType } from "../../../util/sortData";
  import { queryData } from "../../../api/graphql";

  export let entityId;

  let revokedBadges = [];

  const query = `{
    badgeClass(id: "${entityId}") {
      badgeAssertions {
        entityId,
        revoked,
        createdAt,
        user {
          entityId,
          firstName,
          lastName,
          email
        }
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      revokedBadges = res.badgeClass.badgeAssertions.filter(
        ({ revoked }) => revoked
      );
    });
  });

  const tableHeaders = [
    {
      name: "name",
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA
    },

    {
      name: "email",
      attribute: "email",
      reverse: false,
      sortType: sortType.ALPHA
    },

    {
      name: "created",
      attribute: "created",
      reverse: false,
      sortType: sortType.ALPHA
    }
  ];

  $: table = {
    entity: "badgeclass",
    title: `${I18n.t("teacher.badgeclasses.title")}`,
    tableHeaders: tableHeaders
  };
</script>

<Table {...table}>

  {#each revokedBadges as revokedBadge}
    <tr>

      <td class="name">
        {revokedBadge.user.firstName + ' ' + revokedBadge.user.lastName}
      </td>
      <td>{revokedBadge.user.email}</td>
      <td>{moment(revokedBadge.createdAt).format('MMM D, YYYY')}</td>
    </tr>
  {/each}
</Table>
