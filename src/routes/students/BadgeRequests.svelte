<script>
  import {onMount} from "svelte";
  import {getSocialAccounts, getUnearnedBadges, requestBadge, withdrawRequestBadge} from "../../api";

  let provider = '';
  let requested_badges = [];

  onMount(() => {
    getSocialAccounts().then(res => {
      console.log(res);
      provider = res[0]['uid'];
    })
  });

  const requestedBadgesButton = () => {
    getUnearnedBadges(provider).then(res => {
      console.log(res);
      requested_badges = res;
    });
  };

  const requestBadgeButton = () => {
    const url = document.getElementById("requestBadgeField").value;
    requestBadge(url).then(res => {
      console.log(res);
    });
  };

  const withdrawRequestBadgeButton = () => {
    const url = document.getElementById("withdrawRequestBadgeField").value;
      withdrawRequestBadge(url).then(res => {
      console.log(res);
    });
  };

</script>

<style>
    .unawarded-badge {
        border: solid 1px black;
    }
</style>

<div>BadgeRequests</div>

<div>
  <h4>Open requests</h4>

  <button on:click={requestedBadgesButton}>Get requested badges</button>

  <ul>
    {#each requested_badges as requested_badge}
      <li class="unawarded-badge">
        {requested_badge['badge_class']['name']}<br>
        {requested_badge['id']}
      </li>
    {/each}
  </ul>
</div>

<div>
  <button on:click={requestBadgeButton}>Request badge</button>

  <label>
    <input id="requestBadgeField"/>
  </label>
</div>

<div>
  <button on:click={withdrawRequestBadgeButton}>Withdraw request</button>

  <label>
    <input id="withdrawRequestBadgeField"/>
  </label>
</div>
