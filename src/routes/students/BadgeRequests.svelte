<script>
  import { onMount } from "svelte";
  import {
    getSocialAccounts,
    getUnearnedBadges,
    requestBadge,
    withdrawRequestBadge
  } from "../../api";

  let form;
  let provider;
  let requests = [];
  let error = false;

  $: if (provider) getRequestedBadges();

  function getRequestedBadges() {
    getUnearnedBadges(provider).then(
      res => (requests = res.filter(({ date_awarded }) => !date_awarded))
    );
  }

  onMount(() => getSocialAccounts().then(([acc]) => (provider = acc.uid)));

  const makeRequest = event => {
    const id = event.target.entityId.value;

    requestBadge(id)
      .then(() => {
        getRequestedBadges();
        error = "";
        form.reset();
      })
      .catch(err => {
        err.then(res => {
          error = I18n.t(["error", res.fields.error_code]);
        });
      });
  };

  const withdrawRequest = id =>
    withdrawRequestBadge(id)
      .then(getRequestedBadges)
      .catch(err => {
        err.then(res => {
          error = I18n.t(["error", res.fields.error_code]);
        });
      });
</script>

<style>
  ul {
    list-style: initial;
    margin-left: 20px;
  }

  div:not(:last-child) {
    margin-bottom: 25px;
  }

  .error {
    color: red;
  }
</style>

<div>
  <h4>Badge requests</h4>

  <ul>
    {#each requests as { id, badge_class }}
      <li>
        {badge_class.name}
        <button on:click={() => withdrawRequest(id)}>Withdraw</button>
      </li>
    {/each}
  </ul>
</div>

<div>
  <h4>Request a badge</h4>

  <form on:submit|preventDefault={makeRequest} bind:this={form}>
    <label for="entityId">Badgeclass entityId</label>
    <input id="entityId" />

    <button type="submit">Request</button>
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </form>
</div>
