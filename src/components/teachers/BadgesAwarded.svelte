<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import moment from "moment";
  import I18n from "i18n-js";
  import { Button } from "../index";

  export let entityId;

  let awardedBadges = [];

  const query = `{
  badgeClass(id: "${entityId}") {
    badgeAssertions {
      entityId,
      dateCreated,
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
      awardedBadges = res.badgeClass.badgeAssertions.filter(el => el.revoked === false);
    });
  });

  const revokeBadges = () => {

  }
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
        <Button onClick={() => revokeBadges()}
          label={I18n.t('teacher.badgeRevoked.revoke')}/>
      </span>
    </th>
  </tr>
  </thead>
  <tbody>
  {#each awardedBadges as awardedBadge}
    <tr>
      <td><input type="checkbox"></td>
      <td class="name">{awardedBadge.user.firstName + " " + awardedBadge.user.lastName}</td>
      <td>{awardedBadge.user.email}</td>
      <td>{moment(awardedBadge.dateAwarded).format('MMM D, YYYY')}</td>
    </tr>
  {/each}
  {#if awardedBadges.length === 0}
    <tr>
      <td><input type="checkbox"></td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
  {/if}
  </tbody>
</table>