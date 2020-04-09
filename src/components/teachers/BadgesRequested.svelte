<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import moment from "moment";

  export let entityId;

  let requests = [];

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
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      console.log(res);
      requests = res.badgeClass.enrollments;
    });
  });

  const awardBadges = () => {

  }
</script>

<style>
  .name {
    font-weight: bold;
  }

  th {
    text-align: left;
  }

  td {
    width: 25%;
  }
</style>

<table>
  <thead>
    <tr>
      <th><input type="checkbox"></th>
      <th colspan="3">
        <input type="search">
        <button on:click={() => awardBadges()}>award</button>
      </th>
    </tr>
  </thead>
  {#each requests as request}
  <tr>
    <td><input type="checkbox"></td>
    <td class="name">{request.user.firstName + " " + request.user.lastName}</td>
    <td>{request.user.email}</td>
    <td>{moment(request.dateCreated).format('MMM D, YYYY')}</td>
  </tr>
  {/each}
</table>