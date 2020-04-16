<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import moment from "moment";

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
        el => el.revoked === true
      );
    });
  });

  const revokeBadges = () => {};
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
    border-bottom: 3px solid var(--grey-3);
    cursor: pointer;
  }

  th,
  td {
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
      <th>
        <input type="checkbox" />
      </th>
      <th colspan="3">
        <span class="actions">
          <input type="search" />
        </span>
      </th>
    </tr>
  </thead>
  <tbody>
    {#each revokedBadges as revokedBadge}
      <tr>
        <td>
          <input type="checkbox" />
        </td>
        <td class="name">
          {revokedBadge.user.firstName + ' ' + revokedBadge.user.lastName}
        </td>
        <td>{revokedBadge.user.email}</td>
        <td>{moment(revokedBadge.createdAt).format('MMM D, YYYY')}</td>
      </tr>
    {/each}
    {#if revokedBadges.length === 0}
      <tr>
        <td>
          <input type="checkbox" />
        </td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    {/if}
  </tbody>
</table>
