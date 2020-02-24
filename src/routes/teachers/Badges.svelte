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
</style>

<h2>
  {I18n.t('teacher.badges.title')}
  {#await userPromise then user}
    <span>in</span>
    {user.institution.name}
  {/await}
</h2>

{#await badgesPromise}
  <p>loading</p>
{:then badges}
  {#each badges as badge}
    <li>{badge.name}</li>
  {/each}
{:catch error}
  <p>error loading badges</p>
{/await}
