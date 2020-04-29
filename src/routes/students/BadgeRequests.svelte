<script>
  import { onMount } from "svelte";
  import {
    getSocialAccounts,
    getUnearnedBadges,
    requestBadge,
    withdrawRequestBadge
  } from "../../api";
  import Badge from "../../components/shared/Badge.svelte";

  let form;
  let provider;
  let requests = [];
  let error = false;

  function getRequestedBadges() {
    getUnearnedBadges().then(res => {
      (requests = res.filter(({date_awarded}) => !date_awarded));
      requests.map(el => {
        el.badge_class.entityId = el.badge_class.entity_id;
      });
    }, err => {
      console.error(err);
    });
  }

  onMount(() => {
    getSocialAccounts().then(([acc]) => {
      (provider = acc.uid);
      getRequestedBadges();
    })
  });

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
    list-style: none;
    margin-left: 20px;
  }

  div:not(:last-child) {
    margin-bottom: 25px;
  }

  div.content {
      display: grid;
      grid-template-columns: 31% 31% 31%;
      grid-row: auto;
      grid-column-gap: 25px;
      grid-row-gap: 25px;
  }

  @media (max-width: 1120px) {
      div.content {
          grid-template-columns: 48% 48%;
      }
  }

  @media (max-width: 820px) {
      div {
          grid-template-columns: 100%;
      }
  }

</style>

<div>
  <h4>Badge requests</h4>

  <div class="content">
    {#each requests as { id, badge_class }}
      <Badge badgeClass={badge_class} badge={badge_class} enrollment={true}/>
    {/each}
  </div>
</div>
