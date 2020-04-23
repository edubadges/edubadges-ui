<script>
  import I18n from "i18n-js";
  import moment from "moment";
  import { Table } from "../../teachers";
  import { sort, sortType } from "../../../util/sortData";
  import { Button, CheckBox } from "../../../components";
  import { awardBadges } from "../../../api";

  export let entityId;
  export let collection = [];

  let selection = [];
  let checkAllValue = false;

  function award() {
    awardBadges(entityId, selection);
  }

  function onCheckAll(val) {
    selection = val ? collection.map(({ entityId }) => entityId) : [];
  }

  function onCheckOne(val, entityId) {
    if (val) {
      selection.push(entityId);
      table.checkAllValue = selection.length === collection.length;
    } else {
      selection = selection.filter(id => id !== entityId);
      table.checkAllValue = false;
    }
  }

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
    tableHeaders: tableHeaders,
    onCheckAll
  };
</script>

<Table {...table} withCheckAll bind:checkAllValue>
  <span slot="check-buttons">
    <slot name="check-buttons" />
  </span>

  {#each collection as { entityId, user, dateCreated } (entityId)}
    <tr>
      <td>
        <CheckBox
          value={selection.includes(entityId)}
          onChange={val => onCheckOne(val, entityId)} />
      </td>
      <td>{user.firstName + ' ' + user.lastName}</td>
      <td>{user.email}</td>
      <td>{moment(dateCreated).format('MMM D, YYYY')}</td>
    </tr>
  {/each}
</Table>
