<script>
    import { onMount } from "svelte";
    import { queryData } from "../../api/graphql";
    import moment from "moment";

    export let entityId;

    let requests = [];

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
        console.log(res);
        requests = res.badgeClass.badgeAssertions;  // TODO: split between awarded and revoked
      });
    });

    const revokeBadges = () => {

    }
</script>

<style>
    th, td {
        width: 25% !important;
    }
</style>

<table>
    <thead>
    <tr>
        <th><input type="checkbox"></th>
        <th colspan="3">
            <input type="search">
            <button on:click={() => revokeBadges()}>award</button>
        </th>
    </tr>
    </thead>
  {#each requests as request}
      <tr>
          <td><input type="checkbox"></td>
          <td>{request.user.firstName + " " + request.user.lastName}</td>
          <td>{request.user.email}</td>
          <td>{moment(request.dateAwarded).format('MMM D, YYYY')}</td>
      </tr>
  {/each}
</table>