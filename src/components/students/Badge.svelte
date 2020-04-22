<script>
  import {onMount} from "svelte";
  import moment from "moment";
  import trash from "../../icons/trash.svg";

  export let badge;

</script>

<style>
  .badge {
    display: flex;
    flex-direction: column;
    background-color: var(--grey-2);
  }

  .header {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: white;
  }

  .header span {
    font-size: 22px;
    margin: 15px 0 0 0;
  }

  .header img {
    max-width: 200px;
    margin: 15px auto;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 15px;
    height: 100%;
  }

  .content-header span.name {
    font-size: 22px;
    margin-bottom: 15px;
    display: inline-block;
    line-height: 24px;
  }

  .details {
    display: flex;
    flex-direction: row;
  }

  .details img {
    max-width: 55px;
    margin-right: 15px;
  }

  .details div.issued {
    display: flex;
    flex-direction: column;
  }

  .details div.issued span {
    margin-bottom: 4px;
  }

  .details span.issued-by {
    color: var(--purple);
    font-size: 16px;
  }

  .details span.faculty {
    font-size: 13px;
    color: var(--grey-8);

  }

  .actions {
    display: flex;
    margin-top: auto;
    align-items: center;
    justify-content: flex-end;
  }

  .actions > div {
    height: 32px;
    padding: 5px 12px;
    border-radius: 3px;
    background-color: var(--grey-3);
    color: var(--text-grey-light);
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

{#if badge}
  <div class="card badge">
    <div class="header">
      <span>{moment(badge.issuedOn).format('MMM D, YYYY')}</span>
      <img src={badge.image} alt=""/>
    </div>
    <div class="content">
      <div class="content-header">
        <span class="name">{badge.badgeclass.name}</span>
      </div>

      <div class="details">
        <img src={badge.badgeclass.issuer.image} alt=""/>
        <div class="issued">
          <span class="issued-by">Issued by</span>
          <span class="issuer">{badge.badgeclass.issuer.name}</span>
          <span class="faculty">({badge.badgeclass.issuer.faculty.name})</span>
        </div>
      </div>
      <div class="actions">
        <div class="delete">
          {@html trash}
        </div>
        <div class="share">Share</div>
      </div>
    </div>
  </div>

{/if}
