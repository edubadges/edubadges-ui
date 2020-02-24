<script>
  import { link } from "svelte-routing";
  import I18n from "i18n-js";
  import { getTeacherBadges, requestProfile } from "../../api";

  let userPromise = requestProfile();
  let badgesPromise = getTeacherBadges();
</script>

<style>
  h2 span {
    color: var(--color-text-blue);
  }

  .badges {
    --badge-margin-right: 20px;

    display: flex;
    flex-wrap: wrap;

    margin-right: calc(var(--badge-margin-right) * -1);
  }

  div.badge {
    margin-bottom: 20px;
    margin-right: var(--badge-margin-right);
  }

  div.image {
    width: 200px;
    height: 200px;

    padding: 12px;
    margin-bottom: 6px;

    border: var(--card-border);
    border-radius: 7px;
  }
</style>

<h2>
  {I18n.t('teacher.badges.title')}
  {#await userPromise then user}
    <span>in</span>
    {user.institution.name}
  {/await}
</h2>

{#await badgesPromise then badges}
  <div class="badges">
    {#each badges as badge}
      <div class="badge">
        <div class="image">
          <img src={badge.image} alt={`image for ${badge.name}`} />
        </div>
        <b>{badge.name}</b>
      </div>
    {/each}
  </div>
{/await}
