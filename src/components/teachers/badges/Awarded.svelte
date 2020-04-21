<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import moment from "moment";
  import { Table } from "../../teachers";
  import { queryData } from "../../../api/graphql";
  import { sort, sortType } from "../../../util/sortData";
  import { Button } from "../../../components";

  export let entityId;

  let awardedBadges = [];

  const query = `{
    badgeClass(id: "${entityId}") {
      badgeAssertions {
        entityId,
        createdAt,
        revoked,
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
      awardedBadges = res.badgeClass.badgeAssertions.filter(
        el => el.revoked === false
      );
    });
  });

  const revokeBadges = () => {};

  const tableHeaders = [
    {
      type: "check-all"
    },

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
  <span slot="buttons">
    <Button
      action={revokeBadges}
      text={I18n.t('teacher.badgeRevoked.revoke')} />
  </span>

  {#each awardedBadges as awardedBadge}
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td class="name">
        {awardedBadge.user.firstName + ' ' + awardedBadge.user.lastName}
      </td>
      <td>{awardedBadge.user.email}</td>
      <td>{moment(awardedBadge.dateAwarded).format('MMM D, YYYY')}</td>
    </tr>
  {/each}
</Table>
