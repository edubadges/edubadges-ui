<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import moment from "moment";
  import { Table } from "../../teachers";
  import { queryData } from "../../../api/graphql";
  import { sort, sortType } from "../../../util/sortData";
  import { Button, CheckBox } from "../../../components";

  export let entityId;

  let awardedBadges = [];
  let selection = [];

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
        ({ revoked }) => !revoked
      );
    });
  });

  let checkAllValue = false;
  function onCheckAll(val) {
    selection = val ? awardedBadges.map(({ entityId }) => entityId) : [];
  }

  function onCheckOne(val, entityId) {
    if (val) {
      selection.push(entityId);
      table.checkAllValue = selection.length === awardedBadges.length;
    } else {
      selection = selection.filter(id => id !== entityId);
      table.checkAllValue = false;
    }
  }

  let tableHeaders = [
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
    tableHeaders: tableHeaders,
    onCheckAll
  };
</script>

<Table {...table} withCheckAll bind:checkAllValue>
  <span slot="check-buttons">
    <Button
      small
      disabled
      action={() => {}}
      text={I18n.t('teacher.badgeRevoked.revoke')} />
  </span>

  {#each awardedBadges as awardedBadge (awardedBadge.entityId)}
    <tr>
      <td>
        <CheckBox
          value={selection.includes(awardedBadge.entityId)}
          onChange={val => onCheckOne(val, awardedBadge.entityId)} />
      </td>
      <td class="name">
        {awardedBadge.user.firstName + ' ' + awardedBadge.user.lastName}
      </td>
      <td>{awardedBadge.user.email}</td>
      <td>{moment(awardedBadge.dateAwarded).format('MMM D, YYYY')}</td>
    </tr>
  {/each}
</Table>
