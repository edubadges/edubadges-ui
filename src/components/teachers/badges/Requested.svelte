<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import moment from "moment";
  import { Table } from "../../teachers";
  import { sort, sortType } from "../../../util/sortData";
  import { queryData } from "../../../api/graphql";
  import { Button, CheckBox } from "../../../components";
  import { awardBadges } from "../../../api";

  export let entityId;

  let requests = [];
  let selection = [];

  const query = `{
    badgeClass(id: "${entityId}") {
      enrollments {
        entityId,
        dateCreated,
        dateAwarded,
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
      requests = res.badgeClass.enrollments.filter(
        ({ dateAwarded }) => !dateAwarded
      );
    });
  });

  const award = () => {
    const enrollmentIds = requests
      .filter(({ entityId }) => selection.includes(entityId))
      .map(({ entityId }) => entityId);

    awardBadges(entityId, enrollmentIds);
  };

  let checkAllValue = false;
  function onCheckAll(val) {
    selection = val ? requests.map(({ entityId }) => entityId) : [];
  }

  function onCheckOne(val, entityId) {
    if (val) {
      selection.push(entityId);
      table.checkAllValue = selection.length === requests.length;
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
  <span slot="buttons">
    <Button
      disabled
      action={award}
      text={I18n.t('teacher.badgeRequests.award')} />
  </span>

  {#each requests as request (request.entityId)}
    <tr>
      <td>
        <CheckBox
          value={selection.includes(request.entityId)}
          onChange={val => {
            if (val) {
              selection.push(request.entityId);
            } else {
              selection = selection.filter(entityId => request.entityId !== entityId);
            }
          }} />
      </td>
      <td>{request.user.firstName + ' ' + request.user.lastName}</td>
      <td>{request.user.email}</td>
      <td>{moment(request.dateCreated).format('MMM D, YYYY')}</td>
    </tr>
  {/each}
</Table>
