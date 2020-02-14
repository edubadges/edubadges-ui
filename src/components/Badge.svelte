<script>
  import { onMount } from "svelte";
  import moment from "moment";
  import trash from "../icons/trash.svg";
  import { validBadge } from "../util/validBadge";

  export let data;

  let thisBadge;

  onMount(() => (thisBadge = validBadge(data)));
</script>

<style>
  .badge {
    border: var(--card-border);
    border-radius: var(--card-border-radius);
    padding: 20px 20px 0;
    background: white;
  }

  .badge:not(:last-child) {
    margin-bottom: 20px;
  }

  .info {
    display: flex;
  }

  .img {
    max-width: 150px;
  }

  .img img {
    max-width: 150px;
  }

  .text {
    flex: 1;
    margin-left: 20px;
    padding-bottom: 10px;
    border-bottom: var(--card-border);
  }

  .details {
    display: flex;
    margin: 7px 0 10px;
  }

  .details span.title {
    color: var(--color-text-light-grey);
    display: block;
  }

  .details div:not(.issuer) span {
    white-space: nowrap;
  }

  .details > div:not(:last-child) {
    position: relative;

    --sep-line-width: 1px;
    --sep-space-width: 22px;
    margin-right: calc(var(--sep-space-width) + var(--sep-line-width));
  }

  .details > div:not(:last-child)::after {
    content: "";
    position: absolute;
    height: 100%;
    top: 0;
    margin: 0 calc(var(--sep-space-width) / 2);
    border-right: var(--sep-line-width) solid var(--color-text-light-grey);
  }

  .actions {
    display: flex;
    padding: 10px 0;
    align-items: center;
    justify-content: flex-end;
  }

  .actions > div {
    height: 32px;
    padding: 5px 12px;
    border-radius: 3px;
    background-color: var(--color-background-grey-medium);
    color: var(--color-text-light-grey);
    font-weight: bold;
  }

  .actions > div:not(:first-child) {
    margin-left: 10px;
  }

  .actions .delete {
    padding: 7px 5px;
  }

  .actions .share {
    padding: 5px 12px;
  }

  :global(.delete .fa-trash-alt) {
    height: 100%;
    width: auto;
  }
</style>

{#if thisBadge}
  <div class="badge">
    <div class="info">
      <div class="img">
        <img src={thisBadge.image} alt="" />
      </div>
      <div class="text">
        <span>{thisBadge.title}</span>
        <div class="details">
          <div>
            <span class="title">Awarded</span>
            <span>{moment(thisBadge.issueDate).format('MMM D, YYYY')}</span>
          </div>

          {#if thisBadge.expiryDate}
            <div>
              <span class="title">Expires</span>
              <span>{moment(thisBadge.expiryDate).format('MMM D, YYYY')}</span>
            </div>
          {/if}

          <div class="issuer">
            <span class="title">Awarded by</span>
            <span>{thisBadge.awardedBy}</span>
          </div>
        </div>
        <span>{thisBadge.description}</span>
      </div>
    </div>

    <div class="actions">
      <div class="delete">
        {@html trash}
      </div>
      <div class="share">Share</div>
    </div>
  </div>
{/if}
