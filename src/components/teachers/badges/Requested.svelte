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
      requests = res.badgeClass.enrollments.filter(el => !el.dateAwarded);
    });
  });

  const award = () => {
    const enrollmentIds = requests
      .filter(el => el.checked)
      .map(el => {
        return el.entityId;
      });
    awardBadges(entityId, enrollmentIds).then(
      res => {
        res.json().then(result => console.log(result));
      },
      err => {
        console.log(err);
      }
    );
  };

  const addNewUser = () => {};

  const nothing = () => {};

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
      action={() => award()}
      text={I18n.t('teacher.badgeRequests.award')} />
    <Button
      action={() => addNewUser()}
      text={I18n.t('teacher.badgeRequests.newUser')} />
  </span>

  {#each requests as request}
    <tr>
      <td>
        <CheckBox bind:value={request.checked} label="" onChange={nothing} />
      </td>
      <td>{request.user.firstName + ' ' + request.user.lastName}</td>
      <td>{request.user.email}</td>
      <td>{moment(request.dateCreated).format('MMM D, YYYY')}</td>
    </tr>
  {/each}
</Table>
