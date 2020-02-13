<script>
  import trash from "../icons/trash.svg";
  export let data;
</script>

<style>
  .badge {
    border: var(--card-border);
    border-radius: var(--card-border-radius);
    padding: 20px 20px 0;
  }

  .info {
    display: flex;
    flex-wrap: wrap;
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

  .details span {
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

<div class="badge">
  <div class="info">
    <div class="img">
      {#if data && data.image}
        <img src={data.image} alt="" />
      {:else}
        <img src="https://via.placeholder.com/500?text=Placeholder" alt="" />
      {/if}
    </div>

    <div class="text">
      {#if data && data.json.badge.name['@value']}
        <span>{data.json.badge.name['@value']}</span>
      {:else}
        <h4>Climbing the mountain</h4>
      {/if}

      <div class="details">
        <div>
          <span class="title">Awarded</span>
          {#if data && data.json.issuedOn['@value']}
            <span>{data.json.issuedOn['@value']}</span>
          {:else}
            <span>Sep 10, 2019</span>
          {/if}
        </div>

        {#if data && data.json.expires}
          <div>
            <span class="title">Expires</span>
            {#if data.json.expires['@value']}
              <span>{data.json.expires['@value']}</span>
            {:else}
              <span>Sep 10, 2025</span>
            {/if}
          </div>
        {/if}

        <div>
          <span class="title">Awarded by</span>
          {#if data && data.json.badge.issuer.name['@value']}
            <span>{data.json.badge.issuer.name['@value']}</span>
          {:else}
            <span>University Example Issuer</span>
          {/if}
        </div>
      </div>
      {#if data && data.json.badge.description['@value']}
        <span>{data.json.badge.description['@value']}</span>
      {:else}
        <div class="description">
          Knights of Ni, we are but simple travelers who seek the enchanter who
          lives beyond these woods. He hasn't got shit all over him. Burn her! He
          hasn't got shit all over him. I am your king.Look, my liege! We shall
          say 'Ni' again to you, if you do not appease us. You don't frighten us,
          English pig-dogs! Go and boil your bottoms, sons of a silly person! I
          blow my nose at you, so-called Ah-thoor Keeng, you and all your silly
          English K-n-n-n-n-n-n-n-niggits!
        </div>
      {/if}
    </div>
  </div>

  <div class="actions">
    <div class="delete">
      {@html trash}
    </div>
    <div class="share">Share</div>
  </div>
</div>
