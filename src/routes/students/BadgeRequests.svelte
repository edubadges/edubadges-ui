<script>
  import {onMount} from "svelte";
  import {getSocialAccounts, getUnearnedBadges, requestBadge, withdrawRequestBadge} from "../../api";

  let provider = '';
  let requested_badges_promise = new Promise((resolve, reject) => setTimeout(() => reject('timeout'), 100));

  onMount(() => {
    getSocialAccounts().then(res => {
      provider = res[0]['uid'];
      requested_badges_promise = getUnearnedBadges(provider);
    })
  });

  let badgeRequestOutput = '';
  let requestBadgeEntityId = '';
  const requestBadgeButton = () => {
    requestBadge(requestBadgeEntityId).then(res => {
      if(res.ok !== undefined && !res.ok) {
          res.json().then(output => {
            badgeRequestOutput = output['detail'];
          });
      } else {
        requested_badges_promise = getUnearnedBadges(provider);
        badgeRequestOutput = '';
        requestBadgeEntityId = '';
      }
    });
  };

  const withdrawRequestBadgeButton = (enrollmentID) => {
    withdrawRequestBadge(enrollmentID).then(res => {
      requested_badges_promise = getUnearnedBadges(provider);
    });
  };
</script>

<style>
  .requested-badge {
    height: 50px;
    border: solid 1px black;
    margin-bottom: 10px;
  }

  .withdraw-request-button {
    float: right;
  }
</style>

<div>BadgeRequests</div>

<div>
  <h4>Open requests</h4>

  {#await requested_badges_promise}
    <div>
      ...loading requested badges
    </div>
  {:then requested_badges}
    <ul>
      {#each requested_badges.filter(badge => !badge['date_awarded']) as requested_badge}
        <li class="requested-badge">
          {requested_badge['badge_class']['name']}
          <button class="withdraw-request-button" on:click={() => withdrawRequestBadgeButton(requested_badge['id'])}>Withdraw request</button>
        </li>
      {/each}
    </ul>
  {:catch error}
    <div>
      error fetching requested badges
    </div>
  {/await}
</div>

<div>
  <p>
    Enter badgr.issuer_badgeclass entity_id
  </p>

  <button on:click={requestBadgeButton}>Request badge</button>

  <label>
    <input bind:value={requestBadgeEntityId}/>
  </label>
  <p style="color: red">{badgeRequestOutput}</p>
</div>
