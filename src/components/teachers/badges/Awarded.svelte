<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import moment from "moment";
  import { Table } from "../../teachers";
  import { queryData } from "../../../api/graphql";
  import { sort, sortType } from "../../../util/sortData";
  import { Button, CheckBox } from "../../../components";

  export let assertions = [];
  let selection = [];

  let checkAllValue = false;
  function onCheckAll(val) {
    selection = val ? assertions.map(({ entityId }) => entityId) : [];
  }

  function onCheckOne(val, entityId) {
    if (val) {
      selection.push(entityId);
      table.checkAllValue = selection.length === assertions.length;
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

  {#each assertions as { entityId, user, dateAwarded } (entityId)}
    <tr>
      <td>
        <CheckBox
          value={selection.includes(entityId)}
          onChange={val => onCheckOne(val, entityId)} />
      </td>
      <td class="name">{user.firstName + ' ' + user.lastName}</td>
      <td>{user.email}</td>
      <td>{moment(dateAwarded).format('MMM D, YYYY')}</td>
    </tr>
  {/each}
</Table>
