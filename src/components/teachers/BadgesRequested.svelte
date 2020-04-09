<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import moment from "moment";
  import { Button } from "../index";
  import I18n from "i18n-js";

  export let entityId;

  let requests = [];
  let issuerId;

  const query = `{
    badgeClass(id: "${entityId}") {
      enrollments {
        entityId,
        dateCreated,
        user {
          entityId,
          firstName,
          lastName,
          email
        }
      },
      issuer {
        entityId
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      console.log(res);
      requests = res.badgeClass.enrollments;
      issuerId = res.badgeClass.issuer.entityId;
    });
  });

  const awardBadges = () => {
  };

  const addNewUser = () => {
  };
</script>

<style>
  .name {
    font-weight: bold;
  }

  input {
    font-size: 16px;
    padding: 2px 0 2px 8px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead th {
    text-align: left;
    border-bottom: 3px solid var(--color-background-grey-dark);
    cursor: pointer;
  }

  th, td {
    padding: var(--ver-padding-s) 0;
  }

  tbody tr:not(:last-of-type) td {
    border-bottom: var(--card-border);
  }

  .actions {
    float: right;
  }
</style>

<table>
  <thead>
    <tr>
      <th><input type="checkbox"></th>
      <th colspan="3">
        <span class="actions">
          <input type="search">
          <Button onClick={() => awardBadges()}
            label={I18n.t('teacher.badgeRequests.award')}/>
          <Button onClick={() => addNewUser()}
            label={I18n.t('teacher.badgeRequests.newUser')}/>
        </span>
      </th>
    </tr>
  </thead>
  <tbody>
  {#each requests as request}
    <tr>
      <td><input type="checkbox"></td>
      <td class="name">{request.user.firstName + " " + request.user.lastName}</td>
      <td>{request.user.email}</td>
      <td>{moment(request.dateCreated).format('MMM D, YYYY')}</td>
    </tr>
  {/each}
  {#if requests.length === 0}
    <tr>
      <td><input type="checkbox"></td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
  {/if}
  </tbody>
</table>